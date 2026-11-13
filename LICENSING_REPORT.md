# Oracle JDK / Non-Corretto JDK to Amazon Corretto Licensing Report

## 1. Summary

| Item | Value |
|---|---|
| Project | kafka-ui (com.provectus:kafka-ui) |
| Java source files scanned | 416 (`src/` trees of all modules) |
| Oracle internal API issues (`sun.*`, `com.sun.*`, `com.oracle.*`) | 0 |
| Vendor-specific issues found | 15 (13 CI workflows, 1 Dockerfile, 1 devcontainer) |
| Issues fixed | 15 |
| Issues requiring manual review | 0 |

Scan completed: zero Oracle internal API usages found. The JDK vendor in use before migration was
Azul Zulu (CI `distribution: 'zulu'`, `azul/zulu-openjdk-alpine` container image) and the Microsoft
devcontainer Java image. No Oracle JVM flags (`-XX:+UnlockCommercialFeatures`, `-XX:+FlightRecorder`),
Oracle JDK paths, `com.oracle.javafx` dependencies or `<vendor>oracle</vendor>` toolchain entries were found.

## 2. Dependency Table

| File | Line | Oracle API | Replacement | Status |
|---|---|---|---|---|
| N/A | — | No Oracle API imports detected | — | Pass |

Scan completed: zero Oracle internal API usages found.

## 3. Licensing Cost Estimate

Oracle Java SE Universal Subscription (reference pricing):

| Employees | Rate | Monthly | Annual | 5-Year |
|---|---|---|---|---|
| 500 | $15.00/emp/mo | $7,500 | $90,000 | $450,000 |
| 1,000 | $12.00/emp/mo | $12,000 | $144,000 | $720,000 |
| 5,000 | $10.50/emp/mo | $52,500 | $630,000 | $3,150,000 |
| 10,000 | $10.50/emp/mo* | $105,000 | $1,260,000 | $6,300,000 |

\* The 10,000-employee rate is extrapolated from the highest published tier (3,000–9,999 at $10.50/emp/mo).
Actual enterprise pricing for 10,000+ employees is negotiated directly with Oracle and may differ.

Amazon Corretto cost: **$0** (no licensing fees, no usage restrictions).

## 4. Modified Files

| File | Change |
|---|---|
| `.github/workflows/backend.yml` | `actions/setup-java` `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/branch-deploy.yml` | `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/build-public-image.yml` | `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/codeql-analysis.yml` | `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/cve.yaml` | `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/e2e-automation.yml` | `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/e2e-checks.yaml` | `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/e2e-manual.yml` | `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/e2e-weekly.yml` | `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/master.yaml` | `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/release-serde-api.yaml` | `distribution: "zulu"` → `"corretto"` |
| `.github/workflows/release.yaml` | `distribution: 'zulu'` → `'corretto'` |
| `.github/workflows/separate_env_public_create.yml` | `distribution: 'zulu'` → `'corretto'` |
| `kafka-ui-api/Dockerfile` | `FROM azul/zulu-openjdk-alpine:21-jre-headless` → `FROM amazoncorretto:21`; Alpine `apk add` replaced: `gcompat` removed (musl→glibc shim, glibc is native on Amazon Linux), `tzdata` → `yum install -y tzdata`, `shadow-utils` installed for user creation, `&& yum clean all`; `addgroup -S`/`adduser -S` → `groupadd -r`/`useradd -r` |
| `.devcontainer/devcontainer.json` | Base image `mcr.microsoft.com/devcontainers/java:0-17` → `mcr.microsoft.com/devcontainers/base:bullseye`; java feature `version` `none` → `21` (project `maven.compiler.release`), `jdkDistro` inserted as `amzn` (the SDKMAN identifier for Amazon Corretto used by the devcontainers java feature) |

`java-version` values were not changed by this migration (they were set to 21 by the preceding Java upgrade).

## 5. Manual Review Items

None. The Dockerfile could not be built locally (no Docker daemon in the migration environment);
the `amazoncorretto:21` image build should be verified in CI.

## 6. Annotation-Processor Upgrades

No change required by this migration. Lombok is 1.18.36 (≥ 1.18.22) and maven-compiler-plugin is 3.13.0,
both set by the preceding Java 21 upgrade.
