'use strict';

// English case studies. Mirrors the keys app.js reads from its Korean `projects` object.
window.PROJECTS_EN = {
  finance_bmt: {
    fdeSignal: 'I set the evaluation criteria first, then used them to balance processing speed against accuracy.',
    category: '01 / FINANCE · AI BENCHMARK',
    title: 'Financial-sector document AI benchmark',
    period: 'Aug 2026 · 2 weeks of prep / on site Aug 20–21',
    status: 'On-site benchmark complete',
    context: 'Financial sector · benchmark test (BMT) scoring accuracy and speed',
    ownership: 'Sole owner of frontend, backend, serving, model work, and evaluation',
    scope: 'vLLM · OCR optimization · prompts · synthetic documents · ground truth and masking evaluation',
    metric: '2 days',
    metricLabel: 'On-site accuracy and speed benchmark / after 2 weeks of prep',
    metricCaption: 'From build to on-site evaluation',
    summary: 'I prepared for about two weeks and ran the on-site benchmark, choosing the serving configuration by comparing processing speed and detection accuracy on the same basis.',
    sections: [
      ['Problem and constraints: unseen documents, short preparation', 'The on-site documents were not fixed in advance, and preparation time was about two weeks. I configured serving for that schedule, prepared evaluation documents, synthetic data, and ground truth myself, and built an evaluation flow that could quickly review extraction and masking results on documents we had never seen.'],
      ['Technical judgment: balancing speed and quality', 'I compared concurrency, resolution, output structure, and precision settings, and did not adopt settings that improved processing speed but fell short of the bar for extraction and masking accuracy. For example, one serving candidate processed 200 pages in 6m 11.8s, but weighted recall at IoU 0.5 fell to 59.0%, so I excluded it. The final serving configuration accounted for both GPU contention and structured-output stability.'],
      ['Removing an OCR bottleneck', 'I replaced post-processing that repeatedly scanned the whole image to compute region coordinates with a linear computation. I separated request queueing from inference time to locate the bottleneck, and improved the OCR flow while confirming text and coordinates stayed intact. On the same 40 pages, processing time fell 37.7%, from 203.5s to 126.8s, and coordinate generation on a detection-heavy page fell from about 8.48s to 0.71s.'],
      ['Aligning the evaluation with the masks actually applied', 'I fixed a bug that dropped later pages of multi-page documents and made it possible to compare values, coordinates, and images side by side. During review I filled in items missing from the ground truth and checked missed and over-masked areas against the masks actually applied to the images. I implemented label import and JSON/CSV export that reflects review edits, connecting evaluation to result delivery.'],
      ['Pre-validation and the on-site benchmark', 'Before the on-site evaluation, I validated the full processing path on 100 documents and 200 pages I assembled, using reviewed ground truth. It finished in 5m 13s (about 1.57s per page) with zero failures, reaching 97.2% weighted recall and 0.975 weighted F2 at IoU 0.5 in detecting personal-data field regions. On site, I ran new documents and did the labeling, ground truth creation, error analysis, and prompt revisions myself.']
    ]
  },
  finance_serving: {
    fdeSignal: 'I measured latency stage by stage to narrow the cause, and split delivery timing so feature work and the customer\'s RPA integration could run in parallel.',
    category: '02 / FINANCE · INFERENCE OPTIMIZATION',
    title: 'Optimizing 700+ document types and integrating financial systems',
    period: 'Apr 2026 — present',
    status: 'Ongoing customer requirements',
    context: 'Financial sector · reducing document processing latency and meeting integration needs',
    ownership: 'Backend, model-calling service, serving optimization, integration API development',
    scope: 'vLLM · parallel processing · timing instrumentation · RPA integration support',
    metric: '4.5s → 2.7s',
    metricLabel: 'Median time per page (p50)',
    metricCaption: '700+ document types · measured one page at a time with no queueing',
    summary: 'As document classification grew past 700 types, I narrowed the added latency down with per-stage timing and cut median time per page from 4.5 to 2.7 seconds. Accuracy was confirmed unchanged on the 681-document evaluation set.',
    sections: [
      ['Problem: latency grew with document types', 'The service chained document classification, key information extraction, OCR, rotation detection, and confidence scoring. As classification grew past 700 types, latency increased, and we had to support both feature growth and the processing speed the customer required.'],
      ['Finding the cause: per-stage timing and bottleneck analysis', 'I built a tool that aggregates processing logs per request and retry so time in each stage could be compared on the same basis. I separated concurrency at the document, page, and model-call levels to analyze waiting stages, and applied serving settings suited to the customer\'s GPU environment based on vLLM benchmarks and prefill versus decode bottleneck analysis.'],
      ['Improvements and results', 'I parallelized stages that could run independently, and ran VLM verification of fields not confirmed by OCR in parallel with a concurrency limit. Removing duplicate OCR and image encoding and shrinking input images reduced median time per page (p50) from 4.5 to 2.7 seconds, and the share of pages over 3 seconds from 79% to 41%. These were measured one page at a time with no queueing, and accuracy was confirmed equivalent to the previous build on an evaluation set of 681 documents.'],
      ['Catching LLM regressions with evals: degenerate output and silent structured-output errors', 'To cut latency I turned off thinking mode, then ran the 681-document evaluation set. In 46 of 375 extraction documents, the model repeated whitespace until it hit the token limit and the JSON failed to parse. A single-document A/B confirmed the setting as the cause (completion tokens 4096 to 5), so I reverted it for extraction and classification calls on the fine-tuned model. When downscaling classification images, I found that one misread character could be snapped by the structured-output enum to a different valid code, silently switching the extraction schema. I raised the default resolution and fixed the eval harness so it follows the same downscaling path as production. I also instrumented token usage by stage across 8 kinds of model calls.'],
      ['Integration around the customer\'s schedule', 'I split delivery of new OCR field extraction from integration testing to match the customer\'s RPA development schedule. I added a field specification and input validation to the existing ingestion API and provided the user guide first, so extraction development and the customer\'s integration work could proceed at the same time.']
    ]
  },
  enterprise_document_ai: {
    fdeSignal: 'Each time the conditions agreed with the customer changed, I realigned the design, and fixed the structural problems I found along the way.',
    category: '03 / ENTERPRISE · PRODUCT ENGINEERING',
    title: 'Document AI product: from customer requirements to review and integration',
    period: 'Jul 2026 — present',
    status: 'In active development',
    context: 'Enterprise customer · document AI service development and field feedback',
    ownership: 'Sole frontend and backend developer / model work with one engineer',
    scope: 'Hierarchical schemas · review UI · integration APIs · model serving · Docker Compose',
    metric: '24.8s → 7.3s',
    metricLabel: 'Time per page (job-claim query caching)',
    metricCaption: 'Graph-mode decoding 27.0s → 12.3s · no loss in accuracy',
    summary: 'I am building a document AI product by turning requirements agreed with the customer into schemas, review screens, and API contracts. I have handled the problems that running the product brings, from negotiating the high-availability setup to responding to a customer server incident and analyzing model server crashes.',
    sections: [
      ['From customer needs to product structure and API contracts', 'I translated repeated items and per-document requirements into hierarchical field, group, and table schemas and review screens. Moving and reordering page bundles, result versions, and masking and view permissions are reflected in API request, response, and error contracts, and I wrote the user guide. Execution versions are pinned at job intake so retries use the same schema and processing configuration.'],
      ['High availability: active-active on the agreed RDS and S3', 'I redesigned high availability across two GPU servers twice while working it out with the customer. I first proposed active-active on AWS managed services; once it was settled that managed services could not be used, I proposed within four days a primary-standby design in which the product package itself replicates the database, job queue, and file storage. When the customer later agreed to provide RDS and S3, the final setup became active-active on RDS and S3. While reviewing that setup, I found that page input files existed only on each server\'s local disk, so processing could fail even without an outage whenever the other server picked up the job. I changed the engine to read page images directly from S3, so any server can process any page, which also stopped input files containing personal data from accumulating on server disks.'],
      ['Incident response: OCR failing completely after a server restart', 'After a customer server restarted, the OCR service alone stayed unhealthy and every document processing request failed. From the screens and logs the customer sent, I confirmed the GPU and driver were healthy and that only the container could not load the driver, and narrowed the cause to an empty driver file left inside the container. After reproducing the same symptoms in a test environment, I personally gave the customer a recovery procedure the same day that took about 10 minutes without stopping other services, and built it into the next package. Why the driver file location changed on restart was not determined at the time, so I logged it for follow-up and made sure the same condition would no longer cause an outage.'],
      ['Root cause analysis: intermittent model server crashes in internal validation', 'A model server in our internal validation environment crashed with GPU errors about once every 2,000 requests, failing the requests in flight. Crashes also happened at low request counts and memory use, which ruled out load. When the first configuration change did not help, I traced the kernel selection logs and narrowed the cause to a library bug where a specific GPU compute kernel interacted with execution graph caching. Excluding that kernel kept speed unchanged, with no recurrence before the model was replaced. I then chose stability by switching to a model about one-third slower whose quality difference was within measurement variance.'],
      ['Structured output: rejecting schemas the model server reads differently, at save time', 'Value patterns in a schema are compiled into constrained-decoding grammars on the model server. Validation used Python regex rules, so a saved pattern could fail only at job time, or lose part of the Hangul range and make Korean names come out romanized. I added save-time validation that accepts only patterns the decoding engine reads the same way as Python, and the editor shows where to fix them. Comparing about 40,000 random patterns found none among the accepted ones that were read differently, and all existing patterns still passed.'],
      ['Restructuring documents while preserving review history', 'When pages of the same document type are reorganized, existing extraction results are reused and only bundle composition and merged results are updated. Pages re-extract only when their type changes, and review records for unaffected bundles are kept. Field, page, and bounding-box provenance lets reviewers trace even repeated items back to the source document.'],
      ['Performance: processing time, OCR memory, and the review screen', 'I reduced bottlenecks stage by stage, measuring each change in a test environment. Replacing the parsing of a 1.8 MB schema JSON under a lock on every job claim with query caching cut time per page from 24.8s to 7.3s, and enabling graph mode on the inference server cut decoding per page from 27.0s to 12.3s. A serving upgrade and speculative decoding cut processing time for 147 documents by 28%, and a ground truth comparison confirmed no loss in accuracy. I also found that padding from long lines inflated memory for an entire recognition batch, tested batch splitting, and chose a candidate among several OCR combinations while checking changes in characters, coordinates, and confidence. On the review screen, off-screen thumbnails now load lazily with limited concurrent requests, and I fixed a design where real-time status delivery kept holding a DB connection.']
    ]
  },
  finance_api: {
    fdeSignal: 'I set the optimization target from how the customer actually used the service.',
    category: '04 / FINANCE · DOCUMENT API',
    title: 'Reducing single-document API latency',
    period: 'Jul 2026 — Sep 2026',
    status: 'In maintenance',
    context: 'Financial sector · API-only document processing',
    ownership: 'Requirements, collaboration with AI engineer, packaging, deployment, on-site response',
    scope: 'Document API · single-document optimization · deployment and operations',
    metric: '20–30s → ~2–3s',
    metricLabel: 'Time per request (after warm-up)',
    metricCaption: 'API-only usage · prioritized single-request latency',
    summary: 'I set single-request response time as the optimization target for an API-only customer and, with our AI engineer, cut time per request from 20–30 seconds to about 2–3 seconds after warm-up.',
    sections: [
      ['Problem and target: response time for a single request', 'The customer used only the API and cared more about single-document response time than parallel throughput. Processing took about 20–30 seconds per request depending on the document and conditions, so I set single-request latency as the optimization target to match how the customer used it.'],
      ['Bottleneck and improvements', 'The bottleneck was decoding a large output schema and JSON that repeated its keys on every row. With our AI engineer, I cut time per request to about 2–3 seconds after warm-up by changing the model, fixing non-thinking mode, using a compact output restored at the response stage, and decoding each page image only once.']
    ]
  },
  public_a: {
    fdeSignal: 'I implemented the operating requirements agreed with the customer as a backup, recovery, and manual failover setup.',
    category: '05 / PUBLIC SECTOR · SERVICE CONTINUITY',
    title: 'GPU service failure readiness with backup and recovery',
    period: 'Mar 2026 — Aug 2026',
    status: 'In maintenance',
    context: 'Public Agency A · Active–Standby operating requirement',
    ownership: 'Packaging, deployment, backup and recovery, on-site response',
    scope: 'Active–Standby · PostgreSQL backup and recovery · manual failover',
    metric: 'Active → Standby',
    metricLabel: 'Operating setup for GPU server failure',
    metricCaption: 'Periodic PostgreSQL backup and recovery · manual failover',
    summary: 'I implemented the Active–Standby operating requirements agreed with the customer. For GPU server failures, I deployed a setup that backs up state data in PostgreSQL periodically, restores it on failure, and then fails over manually.',
    sections: [
      ['Requirements and setup: Active–Standby', 'The requirement agreed with the customer was to keep working on a Standby environment and preserve state data even if a GPU server failed. I deployed a setup that backs up state data in PostgreSQL periodically, restores it on failure, and then fails over manually.'],
      ['Business connection: document data for a RAG used by officials', 'Documents are processed into chunked data for RAG and connected to the final service provided by a consortium partner. My scope is document processing and chunk generation, and the output is in regular use in the work of the responsible officials.']
    ]
  },
  public_b: {
    fdeSignal: 'Rather than asking the customer to adopt our existing intake, I added a NAS ingestion path that fit how they store documents.',
    category: '06 / PUBLIC SECTOR · DOCUMENT INTEGRATION',
    title: 'GPU operating controls and NAS document ingestion',
    period: 'Mar 2026 — Jul 2026',
    status: 'In maintenance',
    context: 'Public Agency B · time-based GPU management and NAS integration',
    ownership: 'NAS ingestion development, GPU controls, packaging, deployment, on-site response',
    scope: 'API · portal upload · NAS polling · time-based GPU control',
    metric: '3 intake channels',
    metricLabel: 'Integration fit to how the customer stores and delivers documents',
    metricCaption: 'API · portal upload · NAS polling',
    summary: 'To fit a customer that stores documents on NAS, I added a NAS polling ingestion path, offering three intake paths alongside the API and portal upload.',
    sections: [
      ['An intake path that fits the customer environment', 'Other projects read documents from the deployment server or received them through an API, but this customer kept documents on a NAS server. I added polling-based ingestion that periodically checks the NAS and pulls target documents, offering three intake paths alongside the API and portal upload, and also built in the requirement for time-based GPU resource control.'],
      ['Business connection: document data for a RAG used by officials', 'Ingested documents are processed into chunked data for RAG and connected to the final service provided by a consortium partner. My scope is document processing and chunk generation, and the output is in regular use in the work of the responsible officials.']
    ]
  },
  observability: {
    fdeSignal: 'I packaged software installed across many operating environments myself, delivering simpler configuration and lower resource usage together.',
    category: '07 / PLATFORM · LOG COLLECTION',
    title: 'Lightweight log collection agent and simpler configuration',
    period: 'May 2022 — Nov 2023',
    status: 'Previous role · Exem',
    context: 'Exem · collection agent for SaaS monitoring',
    ownership: 'Sole developer of the log collection service / 20% contribution to the overall monitoring project',
    scope: 'Go · Fluent Bit output plugin · Linux packaging · Docker · Helm · GitHub Actions',
    metric: '70%+',
    metricLabel: 'Memory reduction vs. the previous Fluentd setup on the same log data',
    metricCaption: 'Simpler collection config · custom Go plugin · packaging for multiple environments',
    summary: 'I replaced a Fluentd-based collection agent with Fluent Bit and a custom Go plugin, cutting memory usage by more than 70% on the same logs, and packaged it for installation across many operating environments.',
    sections: [
      ['Problem and decision: complex configuration and memory load', 'Reflecting service features and per-user collection settings made configuration complex, and the Fluentd-based setup carried a heavy memory load. I chose Fluent Bit to reduce memory, also considering that custom plugins could be built in Go, the team\'s common stack, and extended to meet service needs.'],
      ['Implementation and result', 'I implemented masking, labeling, and multi-line collection in a custom Go output plugin, and made collection configuration easy to change based on service features and user settings. Compared with the previous Fluentd setup, agent memory usage dropped by more than 70% when collecting the same log data.'],
      ['Deployment and maintenance', 'For on-premises installs I built packages for Debian, RHEL, Ubuntu, and CentOS, and supported container and Kubernetes installs with Docker images and a Helm chart. I automated shared module updates with GitHub Actions.'],
      ['Scope of my work', 'In a five-person team I built the log collection service alone and also contributed to metric collection (DB, system, container, and Kubernetes agents) and trace collection. I worked on the SaaS monitoring service from early planning and development through launch.']
    ]
  },
  monitoring_pipeline: {
    fdeSignal: 'I translated data characteristics and query needs into storage design, validated load under limited resources, and operated the result.',
    category: '08 / PLATFORM · DATA PIPELINE',
    title: 'Log data pipeline and storage design and operations',
    period: 'Aug 2022 — Apr 2024',
    status: 'Previous role · Exem',
    context: 'Exem · monitoring data pipeline for SaaS and on-premises',
    ownership: 'Sole developer of the log collection pipeline / storage setup and operations',
    scope: 'Fluentd · Kafka · Go · Elasticsearch · OpenSearch · ClickHouse · Druid · Kubernetes',
    metric: 'Collect → Store',
    metricLabel: 'Monitoring data pipeline for SaaS and on-premises',
    metricCaption: 'Fluent Bit Agent · Fluentd Gate · Kafka · Go Connector · Elasticsearch',
    summary: 'I developed the log collection pipeline and designed and operated SaaS and on-premises storage around data characteristics and query patterns, repeatedly validating indexing settings within limited resources.',
    sections: [
      ['Pipeline structure and delivery services', 'Log data flowed Agent (Fluent Bit) → Gate (Fluentd) → Kafka → Connector (Go) → Elasticsearch. I developed the Gate and Connector services that deliver data between middleware, working with gRPC and TCP, and configured Gate to scale out and in based on resource usage and collected data volume. Agents in external environments sent data to internal services, and the load balancer spread load only at the initial connection, so load piled onto one service afterward. I had agents reconnect periodically based on time intervals and load signals so load spread evenly.'],
      ['Storage design: SaaS and on-premises', 'For SaaS I designed Elasticsearch indexes around multi-tenancy and monitoring screen queries, configured automatic backup based on data volume and retention, and migrated to OpenSearch in response to the license change. When bulk queries slowed down, I simplified index fields and restructured queries around time-range and keyword filters to cut the latency. On-premises, I chose ClickHouse for large time-series and statistics queries and compression efficiency, designed tables around query patterns, and migrated from PostgreSQL.'],
      ['Validation: comparing indexing settings under limited resources', 'To improve Elasticsearch indexing performance I tested many setting combinations. I load-tested Druid and Elasticsearch with es-rally, JMeter, and a query load generator, and tuned configurations and HA setup considering operating cost and resource usage.'],
      ['Operations: Kubernetes, monitoring, and alerting', 'I operated Kubernetes development and production environments and built Prometheus and Grafana dashboards. I defined alert rules for operational failures and configured and ran Slack alerting through Alertmanager.']
    ]
  },
  payment_platform: {
    fdeSignal: 'I negotiated specifications directly with external partner developers and implemented integrations for systems with different requirements.',
    category: '09 / BACKEND · PARTNER INTEGRATION',
    title: 'Partner payment API integration and service decomposition',
    period: 'May 2024 — Jan 2025',
    status: 'Previous role · Ebuy',
    context: 'Ebuy Company · real-time deposit and withdrawal web and app service',
    ownership: 'Backend developer / partner integration APIs, service decomposition, deployment and operations',
    scope: 'PHP · Node.js · MariaDB · Redis · AWS · Docker · Argo CD · CloudWatch',
    metric: 'Partner APIs',
    metricLabel: 'System integrations agreed directly with partner developers',
    metricCaption: 'Payment requests · callbacks · webhooks / service decomposition · Argo CD deployment',
    summary: 'I agreed each partner\'s payment integration specs directly with their developers and built the APIs, then split the payment service out of the web server into smaller services deployed with Argo CD.',
    sections: [
      ['Partner integration: agreeing specs for each system', 'In a real-time deposit and withdrawal service, each partner had a different system, response format, and integration method. I agreed specs directly with partner developers and built payment request, callback, and webhook integration APIs in PHP and Node.js.'],
      ['Structure and deployment improvements', 'I split the payment processing service, which was built into the web server, into several smaller services deployed with Argo CD. I introduced Docker-based containers and took part in the service migration caused by the end of support of the AWS EC2 operating system.'],
      ['Operations: data stores, monitoring, and on-call', 'I set up and operated MariaDB and Redis and built monitoring dashboards using AWS CloudWatch and open-source tools. I also built an alerting service using AWS Lambda and SQS.'],
      ['Removing payment notification delays', 'Payment success and failure notifications ran synchronously with payment processing and other business logic, so they lagged when high-frequency events piled up. I moved them to Redis-based asynchronous processing and bulk sending, which removed the delays.']
    ]
  }
};
