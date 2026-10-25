// Setup guides rendered on /projects/[slug]. Text supports `inline code` in backticks.

export type GuideComponent = {
  name: string;
  repo: string;
  url: string;
  runsOn: string;
  does: string;
};

export type GuideStep = {
  title: string;
  body: string;
  code?: { lang: string; content: string };
  note?: string;
  noteKind?: 'warning' | 'tip';
};

export type ProjectGuide = {
  intro: string;
  components: GuideComponent[];
  prerequisites: string[];
  steps: GuideStep[];
  troubleshooting: { problem: string; fixes: string[] }[];
};

export const guides: Record<string, ProjectGuide> = {
  'Distributed-Text-Processing': {
    intro:
      'The system is split across three repositories that run in different places. The Local App runs on your machine and starts a Manager on EC2; the Manager launches Workers on EC2 and coordinates them through SQS, with S3 as shared storage. All three are Java 11 / Maven projects and use the `us-east-1` region.',
    components: [
      {
        name: 'Local App',
        repo: 'AWS_Project',
        url: 'https://github.com/GalHalifa6/AWS_Project',
        runsOn: 'Your machine',
        does: 'Uploads the input file to S3, starts the Manager if needed, sends the job over SQS, and downloads the final HTML report.',
      },
      {
        name: 'Manager',
        repo: 'AWS_manager',
        url: 'https://github.com/GalHalifa6/AWS_manager',
        runsOn: 'EC2 (Manager AMI)',
        does: 'Splits each job into tasks, launches Workers based on n, tracks completion, and builds the HTML summary.',
      },
      {
        name: 'Worker',
        repo: 'AWS_worker',
        url: 'https://github.com/GalHalifa6/AWS_worker',
        runsOn: 'EC2 (Worker AMI)',
        does: 'Pulls tasks from SQS, downloads the text, runs Stanford Parser (POS / constituency / dependency), and uploads results to S3.',
      },
    ],
    prerequisites: [
      'An AWS account with permissions for EC2, S3, and SQS',
      'The IAM role `EMR_EC2_DefaultRole` (attached to the Manager and Worker instances)',
      'AWS CLI configured with a `default` profile using temporary session credentials (access key, secret, and session token — e.g. AWS Academy or `aws sts get-session-token`)',
      'Java 11 and Maven',
    ],
    steps: [
      {
        title: 'Clone the three repositories',
        body: 'Put them side by side — each one builds its own JAR.',
        code: {
          lang: 'bash',
          content: [
            'git clone https://github.com/GalHalifa6/AWS_Project.git',
            'git clone https://github.com/GalHalifa6/AWS_manager.git',
            'git clone https://github.com/GalHalifa6/AWS_worker.git',
          ].join('\n'),
        },
      },
      {
        title: 'Create your S3 bucket',
        body: 'S3 bucket names are globally unique, so create your own and set it as `bucketName` in `src/main/java/org/example/S3Service.java` in all three repos (it is currently `aws-bucket-manager-workers`). Inputs go under `input/`, analysis results under `results/`, and HTML summaries under `html/`.',
        code: { lang: 'bash', content: 'aws s3 mb s3://<your-bucket-name> --region us-east-1' },
      },
      {
        title: 'Build the JARs',
        body: 'Run Maven in each repo. Note that the Local App and the Worker both produce a JAR called `awsLocal-1.0.0.jar` — keep track of which is which.',
        code: {
          lang: 'bash',
          content: [
            '(cd AWS_Project && mvn clean package)  # → target/awsLocal-1.0.0.jar        (Local App)',
            '(cd AWS_manager && mvn clean package)  # → target/AWSManager-1.0-SNAPSHOT.jar',
            '(cd AWS_worker  && mvn clean package)  # → target/awsLocal-1.0.0.jar        (Worker)',
          ].join('\n'),
        },
      },
      {
        title: 'Bake the Manager and Worker AMIs',
        body: 'Launch an EC2 instance (Amazon Linux 2 with Java 11 and the `EMR_EC2_DefaultRole` role), copy the JAR into `/home/ec2-user/`, and create an image from it. Do this once with the Manager JAR and once with the Worker JAR (plus Stanford Parser models if needed). Instances launched from these AMIs start their JAR automatically through EC2 user data.',
        code: {
          lang: 'bash',
          content: [
            '# Manager AMI',
            'scp -i key.pem AWS_manager/target/AWSManager-1.0-SNAPSHOT.jar ec2-user@<manager-host>:/home/ec2-user/',
            '',
            '# Worker AMI',
            'scp -i key.pem AWS_worker/target/awsLocal-1.0.0.jar ec2-user@<worker-host>:/home/ec2-user/',
          ].join('\n'),
        },
        note: 'Never use the Manager AMI as the Worker AMI — every "worker" would start another manager and launch more machines.',
      },
      {
        title: 'Point the Local App at your AMIs',
        body: 'Set both AMI IDs in `AWS_Project/src/main/java/org/example/ManagerService.java`, then rebuild the Local App. The Local App passes the Worker AMI to the Manager when it starts it.',
        code: {
          lang: 'java',
          content: [
            'static final String MANAGER_AMI_ID = "ami-xxxxxxxxxxxxxxxxx"; // your Manager AMI',
            'static final String WORKER_AMI     = "ami-yyyyyyyyyyyyyyyyy"; // your Worker AMI',
          ].join('\n'),
        },
      },
      {
        title: 'Write an input file',
        body: 'One task per line: an analysis type, a tab, and a URL of a plain-text file. Supported types are `POS` (part-of-speech tags), `CONSTITUENCY` (parse tree), and `DEPENDENCY` (word relationships).',
        code: {
          lang: 'text',
          content: [
            'POS\thttps://www.gutenberg.org/files/1659/1659-0.txt',
            'CONSTITUENCY\thttps://www.gutenberg.org/files/1659/1659-0.txt',
            'DEPENDENCY\thttps://www.gutenberg.org/files/1659/1659-0.txt',
          ].join('\n'),
        },
      },
      {
        title: 'Run it',
        body: 'Arguments: the input file, where to save the HTML report, `n` — the maximum number of files per worker (the Manager launches about tasks ÷ n workers, up to 15) — and an optional `terminate` to shut everything down when done. For reference, 9 tasks took about 10–15 minutes with n=1 (9 workers) and about 1.5 hours with n=6 (2 workers) on t1.micro instances.',
        code: { lang: 'bash', content: 'java -jar AWS_Project/target/awsLocal-1.0.0.jar input.txt output.html 1 terminate' },
        note: 'When it finishes, open `output.html` — a summary table linking each input URL to its analysis result in S3, with any errors listed.',
        noteKind: 'tip',
      },
      {
        title: 'Shut down and clean up',
        body: 'With `terminate`, the Manager stops accepting jobs, waits for active ones to finish, terminates all Workers, and then itself. Without it, instances keep running (and billing) — find any leftovers by their `Role` tag and terminate them in the EC2 console.',
        code: {
          lang: 'bash',
          content: [
            'aws ec2 describe-instances --region us-east-1 \\',
            '  --filters "Name=tag:Role,Values=ManagerInstance,WorkerInstance" "Name=instance-state-name,Values=running" \\',
            '  --query "Reservations[].Instances[].InstanceId" --output text',
          ].join('\n'),
        },
      },
    ],
    troubleshooting: [
      {
        problem: 'Manager does not start',
        fixes: ['Check that `EMR_EC2_DefaultRole` exists', 'Verify the Manager AMI ID', 'Check your EC2 instance limits'],
      },
      {
        problem: 'Workers are not processing tasks',
        fixes: ['Confirm Workers are running in the EC2 console', 'Check that the task queue has messages', 'Make sure the Worker JAR is in the Worker AMI'],
      },
      {
        problem: 'S3 uploads fail',
        fixes: ['Check the IAM role permissions', 'Make sure the bucket exists and `bucketName` matches in all three repos'],
      },
      {
        problem: 'Analysis fails',
        fixes: ['Verify the Stanford Parser models are available on the Worker', 'Check the input URL is reachable and the text is valid UTF-8'],
      },
    ],
  },
};
