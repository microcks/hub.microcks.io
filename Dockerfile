FROM registry.access.redhat.com/ubi9/nodejs-18-minimal:1-129.1726695172

MAINTAINER Laurent Broudoux <laurent.broudoux@gmail.com>

ARG MOCKS_REPO=https://github.com/microcks/community-mocks
ARG MOCKS_BRANCH=master

ENV APP_ROOT=/app

WORKDIR ${APP_ROOT}

# root for build stages
USER root

# install git lib
RUN microdnf install ca-certificates git -y \
    && microdnf update -y \
    && microdnf clean all

# frontend
COPY frontend/ ${APP_ROOT}/frontend
RUN cd ${APP_ROOT}/frontend; npm install \
    && npm run-script build-prod \
    && rm -rdf ${APP_ROOT}/frontend/node_modules ${APP_ROOT}/frontend/.cache-loader /opt/app-root/src/.npm /tmp/v8-compile-cache-0

# server
COPY server/ ${APP_ROOT}/server
RUN cd ${APP_ROOT}/server \
    && npm install --unsafe-perm \
    && rm -rdf /opt/app-root/src/.npm /tmp/v8-compile-cache-0

# prepare upstream mocks for server processing
#RUN mkdir -p ${APP_ROOT}/server/data/community-mocks \
#    && mkdir -p /tmp/community-mocks \
#    && git clone -b $MOCKS_BRANCH $MOCKS_REPO /tmp/community-mocks \
#    && cp -a /tmp/community-mocks/artifacts ${APP_ROOT}/server/data/community-mocks/artifacts \
#    && rm -rfd /tmp/community-mocks

### Setup user for build execution and application runtime
ENV HOME=${APP_ROOT}
RUN chmod -R u+x ${APP_ROOT}/server/bin && \
    chgrp -R 0 ${APP_ROOT} && \
    chmod -R g=u ${APP_ROOT} /etc/passwd

### Containers should NOT run as root as a good practice
USER 1001

# Finalize
WORKDIR ${APP_ROOT}/server
ENTRYPOINT [ "/app/server/bin/uid_entrypoint" ]
EXPOSE 4000