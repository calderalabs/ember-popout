export default function locationOrigin() {
  let { location: { protocol, hostname, port } } = window;
  return protocol + '//' + hostname + (port ? ':' + port : '');
}
