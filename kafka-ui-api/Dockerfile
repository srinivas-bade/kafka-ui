FROM amazoncorretto:21

# glibc-based image: the gcompat shim needed by the snappy codec on Alpine is no longer required
RUN yum install -y \
    # configuring timezones
    tzdata \
    # groupadd/useradd
    shadow-utils \
    && yum clean all
RUN groupadd -r kafkaui && useradd -r -g kafkaui kafkaui

# creating folder for dynamic config usage (certificates uploads, etc)
RUN mkdir /etc/kafkaui/
RUN chown kafkaui /etc/kafkaui

USER kafkaui

ARG JAR_FILE
COPY "/target/${JAR_FILE}" "/kafka-ui-api.jar"

ENV JAVA_OPTS=

EXPOSE 8080

# see JmxSslSocketFactory docs to understand why add-opens is needed
CMD java --add-opens java.rmi/javax.rmi.ssl=ALL-UNNAMED  $JAVA_OPTS -jar kafka-ui-api.jar
