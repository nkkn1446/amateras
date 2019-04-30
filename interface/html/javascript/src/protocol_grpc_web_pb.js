/**
 * @fileoverview gRPC-Web generated client stub for Protocol
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.Protocol = require('./protocol_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.Protocol.InterfaceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.Protocol.InterfacePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Protocol.TouchRequest,
 *   !proto.Protocol.TouchReply>}
 */
const methodInfo_Interface_Touch = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Protocol.TouchReply,
  /** @param {!proto.Protocol.TouchRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.Protocol.TouchReply.deserializeBinary
);


/**
 * @param {!proto.Protocol.TouchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Protocol.TouchReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Protocol.TouchReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.Protocol.InterfaceClient.prototype.touch =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Protocol.Interface/Touch',
      request,
      metadata || {},
      methodInfo_Interface_Touch,
      callback);
};


/**
 * @param {!proto.Protocol.TouchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Protocol.TouchReply>}
 *     A native promise that resolves to the response
 */
proto.Protocol.InterfacePromiseClient.prototype.touch =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Protocol.Interface/Touch',
      request,
      metadata || {},
      methodInfo_Interface_Touch);
};


module.exports = proto.Protocol;

