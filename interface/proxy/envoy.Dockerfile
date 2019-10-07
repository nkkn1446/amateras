FROM envoyproxy/envoy:latest
COPY ./envoy.yaml /etc/envoy/envoy.yaml
COPY ./fullchain.pem /etc/fullchain.pem
COPY ./privkey.pem /etc/privkey.pem
CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml
