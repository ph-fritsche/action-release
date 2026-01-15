"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCommandProperties = exports.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports.toCommandProperties = toCommandProperties;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issue = exports.issueCommand = void 0;
    var os2 = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os2.EOL);
    }
    exports.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/uuid/dist/esm-node/rng.js
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
var import_crypto, rnds8Pool, poolPtr;
var init_rng = __esm({
  "node_modules/uuid/dist/esm-node/rng.js"() {
    import_crypto = __toESM(require("crypto"));
    rnds8Pool = new Uint8Array(256);
    poolPtr = rnds8Pool.length;
  }
});

// node_modules/uuid/dist/esm-node/regex.js
var regex_default;
var init_regex = __esm({
  "node_modules/uuid/dist/esm-node/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// node_modules/uuid/dist/esm-node/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "node_modules/uuid/dist/esm-node/validate.js"() {
    init_regex();
    validate_default = validate;
  }
});

// node_modules/uuid/dist/esm-node/stringify.js
function stringify(arr, offset = 0) {
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var byteToHex, stringify_default;
var init_stringify = __esm({
  "node_modules/uuid/dist/esm-node/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    stringify_default = stringify;
  }
});

// node_modules/uuid/dist/esm-node/v1.js
function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  const tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esm({
  "node_modules/uuid/dist/esm-node/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0;
    _lastNSecs = 0;
    v1_default = v1;
  }
});

// node_modules/uuid/dist/esm-node/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "node_modules/uuid/dist/esm-node/parse.js"() {
    init_validate();
    parse_default = parse;
  }
});

// node_modules/uuid/dist/esm-node/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
function v35_default(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL2;
  return generateUUID;
}
var DNS, URL2;
var init_v35 = __esm({
  "node_modules/uuid/dist/esm-node/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/uuid/dist/esm-node/md5.js
function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto2.default.createHash("md5").update(bytes).digest();
}
var import_crypto2, md5_default;
var init_md5 = __esm({
  "node_modules/uuid/dist/esm-node/md5.js"() {
    import_crypto2 = __toESM(require("crypto"));
    md5_default = md5;
  }
});

// node_modules/uuid/dist/esm-node/v3.js
var v3, v3_default;
var init_v3 = __esm({
  "node_modules/uuid/dist/esm-node/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35_default("v3", 48, md5_default);
    v3_default = v3;
  }
});

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/uuid/dist/esm-node/v4.js"() {
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm-node/sha1.js
function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto3.default.createHash("sha1").update(bytes).digest();
}
var import_crypto3, sha1_default;
var init_sha1 = __esm({
  "node_modules/uuid/dist/esm-node/sha1.js"() {
    import_crypto3 = __toESM(require("crypto"));
    sha1_default = sha1;
  }
});

// node_modules/uuid/dist/esm-node/v5.js
var v5, v5_default;
var init_v5 = __esm({
  "node_modules/uuid/dist/esm-node/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35_default("v5", 80, sha1_default);
    v5_default = v5;
  }
});

// node_modules/uuid/dist/esm-node/nil.js
var nil_default;
var init_nil = __esm({
  "node_modules/uuid/dist/esm-node/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// node_modules/uuid/dist/esm-node/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default;
var init_version = __esm({
  "node_modules/uuid/dist/esm-node/version.js"() {
    init_validate();
    version_default = version;
  }
});

// node_modules/uuid/dist/esm-node/index.js
var esm_node_exports = {};
__export(esm_node_exports, {
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v3: () => v3_default,
  v4: () => v4_default,
  v5: () => v5_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_node = __esm({
  "node_modules/uuid/dist/esm-node/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
    var fs = __importStar(require("fs"));
    var os2 = __importStar(require("os"));
    var uuid_1 = (init_esm_node(), __toCommonJS(esm_node_exports));
    var utils_1 = require_utils();
    function issueFileCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os2.EOL}`, {
        encoding: "utf8"
      });
    }
    exports.issueFileCommand = issueFileCommand;
    function prepareKeyValueMessage(key, value) {
      const delimiter = `ghadelimiter_${uuid_1.v4()}`;
      const convertedValue = utils_1.toCommandValue(value);
      if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
      }
      if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
      }
      return `${key}<<${delimiter}${os2.EOL}${convertedValue}${os2.EOL}${delimiter}`;
    }
    exports.prepareKeyValueMessage = prepareKeyValueMessage;
  }
});

// node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJS({
  "node_modules/@actions/http-client/lib/proxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkBypass = exports.getProxyUrl = void 0;
    function getProxyUrl(reqUrl) {
      const usingSsl = reqUrl.protocol === "https:";
      if (checkBypass(reqUrl)) {
        return void 0;
      }
      const proxyVar = (() => {
        if (usingSsl) {
          return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
        } else {
          return process.env["http_proxy"] || process.env["HTTP_PROXY"];
        }
      })();
      if (proxyVar) {
        return new URL(proxyVar);
      } else {
        return void 0;
      }
    }
    exports.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      const upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports.checkBypass = checkBypass;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports.httpOverHttp = httpOverHttp;
    exports.httpsOverHttp = httpsOverHttp;
    exports.httpOverHttps = httpOverHttps;
    exports.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self = this;
      self.options = options || {};
      self.proxyOptions = self.options.proxy || {};
      self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
      self.requests = [];
      self.sockets = [];
      self.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self.requests.length; i < len; ++i) {
          var pending = self.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self = this;
      var options = mergeOptions({ request: req }, self.options, toOptions(host, port, localAddress));
      if (self.sockets.length >= this.maxSockets) {
        self.requests.push(options);
        return;
      }
      self.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self = this;
      var placeholder = {};
      self.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug3("making CONNECT request");
      var connectReq = self.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head2) {
        process.nextTick(function() {
          onConnect(res, socket, head2);
        });
      }
      function onConnect(res, socket, head2) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug3(
            "tunneling socket could not be established, statusCode=%d",
            res.statusCode
          );
          socket.destroy();
          var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        if (head2.length > 0) {
          debug3("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        debug3("tunneling connection has established");
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug3(
          "tunneling socket could not be established, cause=%s\n",
          cause.message,
          cause.stack
        );
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self = this;
      TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug3;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug3 = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug3 = function() {
      };
    }
    exports.debug = debug3;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/@actions/http-client/lib/index.js
var require_lib = __commonJS({
  "node_modules/@actions/http-client/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
    var http = __importStar(require("http"));
    var https = __importStar(require("https"));
    var pm = __importStar(require_proxy());
    var tunnel = __importStar(require_tunnel2());
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports.Headers || (exports.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve2) => __awaiter(this, void 0, void 0, function* () {
            let output = Buffer.alloc(0);
            this.message.on("data", (chunk) => {
              output = Buffer.concat([output, chunk]);
            });
            this.message.on("end", () => {
              resolve2(output.toString());
            });
          }));
        });
      }
    };
    exports.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      const parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
        });
      }
      get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("GET", requestUrl, null, additionalHeaders || {});
        });
      }
      del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("DELETE", requestUrl, null, additionalHeaders || {});
        });
      }
      post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("POST", requestUrl, data, additionalHeaders || {});
        });
      }
      patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PATCH", requestUrl, data, additionalHeaders || {});
        });
      }
      put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PUT", requestUrl, data, additionalHeaders || {});
        });
      }
      head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("HEAD", requestUrl, null, additionalHeaders || {});
        });
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(verb, requestUrl, stream, additionalHeaders);
        });
      }
      /**
       * Gets a typed object from an endpoint
       * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
       */
      getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          const res = yield this.get(requestUrl, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.post(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.put(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.patch(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      /**
       * Makes a raw http request.
       * All other methods such as get, post, patch, and request ultimately call this.
       * Prefer get, del, post and patch
       */
      request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._disposed) {
            throw new Error("Client has already been disposed.");
          }
          const parsedUrl = new URL(requestUrl);
          let info2 = this._prepareRequest(verb, parsedUrl, headers);
          const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
          let numTries = 0;
          let response;
          do {
            response = yield this.requestRaw(info2, data);
            if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
              let authenticationHandler;
              for (const handler of this.handlers) {
                if (handler.canHandleAuthentication(response)) {
                  authenticationHandler = handler;
                  break;
                }
              }
              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(this, info2, data);
              } else {
                return response;
              }
            }
            let redirectsRemaining = this._maxRedirects;
            while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
              const redirectUrl = response.message.headers["location"];
              if (!redirectUrl) {
                break;
              }
              const parsedRedirectUrl = new URL(redirectUrl);
              if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
              }
              yield response.readBody();
              if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                for (const header in headers) {
                  if (header.toLowerCase() === "authorization") {
                    delete headers[header];
                  }
                }
              }
              info2 = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = yield this.requestRaw(info2, data);
              redirectsRemaining--;
            }
            if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
              return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
              yield response.readBody();
              yield this._performExponentialBackoff(numTries);
            }
          } while (numTries < maxTries);
          return response;
        });
      }
      /**
       * Needs to be called if keepAlive is set to true in request options.
       */
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      /**
       * Raw request.
       * @param info
       * @param data
       */
      requestRaw(info2, data) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve2, reject) => {
            function callbackForResult(err, res) {
              if (err) {
                reject(err);
              } else if (!res) {
                reject(new Error("Unknown error"));
              } else {
                resolve2(res);
              }
            }
            this.requestRawWithCallback(info2, data, callbackForResult);
          });
        });
      }
      /**
       * Raw request with callback.
       * @param info
       * @param data
       * @param onResult
       */
      requestRawWithCallback(info2, data, onResult) {
        if (typeof data === "string") {
          if (!info2.options.headers) {
            info2.options.headers = {};
          }
          info2.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        function handleResult(err, res) {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        }
        const req = info2.httpModule.request(info2.options, (msg) => {
          const res = new HttpClientResponse(msg);
          handleResult(void 0, res);
        });
        let socket;
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error(`Request timeout: ${info2.options.path}`));
        });
        req.on("error", function(err) {
          handleResult(err);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      /**
       * Gets an http agent. This function is useful when you need an http agent that handles
       * routing through a proxy server - depending upon the url and proxy environment variables.
       * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
       */
      getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info2 = {};
        info2.parsedUrl = requestUrl;
        const usingSsl = info2.parsedUrl.protocol === "https:";
        info2.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info2.options = {};
        info2.options.host = info2.parsedUrl.hostname;
        info2.options.port = info2.parsedUrl.port ? parseInt(info2.parsedUrl.port) : defaultPort;
        info2.options.path = (info2.parsedUrl.pathname || "") + (info2.parsedUrl.search || "");
        info2.options.method = method;
        info2.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info2.options.headers["user-agent"] = this.userAgent;
        }
        info2.options.agent = this._getAgent(info2.parsedUrl);
        if (this.handlers) {
          for (const handler of this.handlers) {
            handler.prepareRequest(info2.options);
          }
        }
        return info2;
      }
      _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (proxyUrl && proxyUrl.hostname) {
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
              proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
            }), { host: proxyUrl.hostname, port: proxyUrl.port })
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
          retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
          const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
          return new Promise((resolve2) => setTimeout(() => resolve2(), ms));
        });
      }
      _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve2, reject) => __awaiter(this, void 0, void 0, function* () {
            const statusCode = res.message.statusCode || 0;
            const response = {
              statusCode,
              result: null,
              headers: {}
            };
            if (statusCode === HttpCodes.NotFound) {
              resolve2(response);
            }
            function dateTimeDeserializer(key, value) {
              if (typeof value === "string") {
                const a = new Date(value);
                if (!isNaN(a.valueOf())) {
                  return a;
                }
              }
              return value;
            }
            let obj;
            let contents;
            try {
              contents = yield res.readBody();
              if (contents && contents.length > 0) {
                if (options && options.deserializeDates) {
                  obj = JSON.parse(contents, dateTimeDeserializer);
                } else {
                  obj = JSON.parse(contents);
                }
                response.result = obj;
              }
              response.headers = res.message.headers;
            } catch (err) {
            }
            if (statusCode > 299) {
              let msg;
              if (obj && obj.message) {
                msg = obj.message;
              } else if (contents && contents.length > 0) {
                msg = contents;
              } else {
                msg = `Failed request: (${statusCode})`;
              }
              const err = new HttpClientError(msg, statusCode);
              err.result = response.result;
              reject(err);
            } else {
              resolve2(response);
            }
          }));
        });
      }
    };
    exports.HttpClient = HttpClient;
    var lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
  }
});

// node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJS({
  "node_modules/@actions/http-client/lib/auth.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
      }
      // This handler cannot handle 401
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      // currently implements pre-authorization
      // TODO: support preAuth = false where it hooks on 401
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Bearer ${this.token}`;
      }
      // This handler cannot handle 401
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      // currently implements pre-authorization
      // TODO: support preAuth = false where it hooks on 401
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
      }
      // This handler cannot handle 401
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/@actions/core/lib/oidc-utils.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OidcClient = void 0;
    var http_client_1 = require_lib();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error) {
            throw new Error(`Error message: ${error.message}`);
          }
        });
      }
    };
    exports.OidcClient = OidcClient;
  }
});

// node_modules/@actions/core/lib/summary.js
var require_summary = __commonJS({
  "node_modules/@actions/core/lib/summary.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
    var os_1 = require("os");
    var fs_1 = require("fs");
    var { access, appendFile, writeFile } = fs_1.promises;
    exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    var Summary = class {
      constructor() {
        this._buffer = "";
      }
      /**
       * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
       * Also checks r/w permissions.
       *
       * @returns step summary file path
       */
      filePath() {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          }
          try {
            yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
          } catch (_a) {
            throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      /**
       * Wraps content in an HTML tag, adding any HTML attributes
       *
       * @param {string} tag HTML tag to wrap
       * @param {string | null} content content within the tag
       * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
       *
       * @returns {string} content wrapped in HTML element
       */
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      /**
       * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
       *
       * @param {SummaryWriteOptions} [options] (optional) options for write operation
       *
       * @returns {Promise<Summary>} summary instance
       */
      write(options) {
        return __awaiter(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      /**
       * Clears the summary buffer and wipes the summary file
       *
       * @returns {Summary} summary instance
       */
      clear() {
        return __awaiter(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      /**
       * Returns the current summary buffer as a string
       *
       * @returns {string} string of summary buffer
       */
      stringify() {
        return this._buffer;
      }
      /**
       * If the summary buffer is empty
       *
       * @returns {boolen} true if the buffer is empty
       */
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      /**
       * Resets the summary buffer without writing to summary file
       *
       * @returns {Summary} summary instance
       */
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      /**
       * Adds raw text to the summary buffer
       *
       * @param {string} text content to add
       * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
       *
       * @returns {Summary} summary instance
       */
      addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
      }
      /**
       * Adds the operating system-specific end-of-line marker to the buffer
       *
       * @returns {Summary} summary instance
       */
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      /**
       * Adds an HTML codeblock to the summary buffer
       *
       * @param {string} code content to render within fenced code block
       * @param {string} lang (optional) language to syntax highlight code
       *
       * @returns {Summary} summary instance
       */
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML list to the summary buffer
       *
       * @param {string[]} items list of items to render
       * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
       *
       * @returns {Summary} summary instance
       */
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML table to the summary buffer
       *
       * @param {SummaryTableCell[]} rows table rows
       *
       * @returns {Summary} summary instance
       */
      addTable(rows) {
        const tableBody = rows.map((row) => {
          const cells = row.map((cell) => {
            if (typeof cell === "string") {
              return this.wrap("td", cell);
            }
            const { header, data, colspan, rowspan } = cell;
            const tag = header ? "th" : "td";
            const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
            return this.wrap(tag, data, attrs);
          }).join("");
          return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds a collapsable HTML details element to the summary buffer
       *
       * @param {string} label text for the closed state
       * @param {string} content collapsable content
       *
       * @returns {Summary} summary instance
       */
      addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML image tag to the summary buffer
       *
       * @param {string} src path to the image you to embed
       * @param {string} alt text description of the image
       * @param {SummaryImageOptions} options (optional) addition image attributes
       *
       * @returns {Summary} summary instance
       */
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
        const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML section heading element
       *
       * @param {string} text heading text
       * @param {number | string} [level=1] (optional) the heading level, default: 1
       *
       * @returns {Summary} summary instance
       */
      addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML thematic break (<hr>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML line break (<br>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML blockquote to the summary buffer
       *
       * @param {string} text quote text
       * @param {string} cite (optional) citation url
       *
       * @returns {Summary} summary instance
       */
      addQuote(text, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML anchor tag to the summary buffer
       *
       * @param {string} text link text/content
       * @param {string} href hyperlink
       *
       * @returns {Summary} summary instance
       */
      addLink(text, href) {
        const element = this.wrap("a", text, { href });
        return this.addRaw(element).addEOL();
      }
    };
    var _summary = new Summary();
    exports.markdownSummary = _summary;
    exports.summary = _summary;
  }
});

// node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJS({
  "node_modules/@actions/core/lib/path-utils.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
    var path3 = __importStar(require("path"));
    function toPosixPath(pth) {
      return pth.replace(/[\\]/g, "/");
    }
    exports.toPosixPath = toPosixPath;
    function toWin32Path(pth) {
      return pth.replace(/[/]/g, "\\");
    }
    exports.toWin32Path = toWin32Path;
    function toPlatformPath(pth) {
      return pth.replace(/[/\\]/g, path3.sep);
    }
    exports.toPlatformPath = toPlatformPath;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os2 = __importStar(require("os"));
    var path3 = __importStar(require("path"));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("ENV", file_command_1.prepareKeyValueMessage(name, val));
      }
      command_1.issueCommand("set-env", { name }, convertedVal);
    }
    exports.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueFileCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path3.delimiter}${process.env["PATH"]}`;
    }
    exports.addPath = addPath;
    function getInput3(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports.getInput = getInput3;
    function getMultilineInput(name, options) {
      const inputs = getInput3(name, options).split("\n").filter((x) => x !== "");
      if (options && options.trimWhitespace === false) {
        return inputs;
      }
      return inputs.map((input) => input.trim());
    }
    exports.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput3(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports.getBooleanInput = getBooleanInput;
    function setOutput2(name, value) {
      const filePath = process.env["GITHUB_OUTPUT"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("OUTPUT", file_command_1.prepareKeyValueMessage(name, value));
      }
      process.stdout.write(os2.EOL);
      command_1.issueCommand("set-output", { name }, utils_1.toCommandValue(value));
    }
    exports.setOutput = setOutput2;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports.setCommandEcho = setCommandEcho;
    function setFailed2(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports.setFailed = setFailed2;
    function isDebug2() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports.isDebug = isDebug2;
    function debug3(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports.debug = debug3;
    function error(message, properties = {}) {
      command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.error = error;
    function warning2(message, properties = {}) {
      command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.warning = warning2;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.notice = notice;
    function info2(message) {
      process.stdout.write(message + os2.EOL);
    }
    exports.info = info2;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports.group = group;
    function saveState(name, value) {
      const filePath = process.env["GITHUB_STATE"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("STATE", file_command_1.prepareKeyValueMessage(name, value));
      }
      command_1.issueCommand("save-state", { name }, utils_1.toCommandValue(value));
    }
    exports.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports.getIDToken = getIDToken;
    var summary_1 = require_summary();
    Object.defineProperty(exports, "summary", { enumerable: true, get: function() {
      return summary_1.summary;
    } });
    var summary_2 = require_summary();
    Object.defineProperty(exports, "markdownSummary", { enumerable: true, get: function() {
      return summary_2.markdownSummary;
    } });
    var path_utils_1 = require_path_utils();
    Object.defineProperty(exports, "toPosixPath", { enumerable: true, get: function() {
      return path_utils_1.toPosixPath;
    } });
    Object.defineProperty(exports, "toWin32Path", { enumerable: true, get: function() {
      return path_utils_1.toWin32Path;
    } });
    Object.defineProperty(exports, "toPlatformPath", { enumerable: true, get: function() {
      return path_utils_1.toPlatformPath;
    } });
  }
});

// node_modules/env-ci/services/appveyor.js
var appveyor_default;
var init_appveyor = __esm({
  "node_modules/env-ci/services/appveyor.js"() {
    appveyor_default = {
      detect({ env }) {
        return Boolean(env.APPVEYOR);
      },
      configuration({ env }) {
        const pr = env.APPVEYOR_PULL_REQUEST_NUMBER;
        const isPr = Boolean(pr);
        return {
          name: "Appveyor",
          service: "appveyor",
          commit: env.APPVEYOR_REPO_COMMIT,
          tag: env.APPVEYOR_REPO_TAG_NAME,
          build: env.APPVEYOR_BUILD_NUMBER,
          buildUrl: `https://ci.appveyor.com/project/${env.APPVEYOR_PROJECT_SLUG}/build/${env.APPVEYOR_BUILD_VERSION}`,
          branch: env.APPVEYOR_REPO_BRANCH,
          job: env.APPVEYOR_JOB_NUMBER,
          jobUrl: `https://ci.appveyor.com/project/${env.APPVEYOR_PROJECT_SLUG}/build/job/${env.APPVEYOR_JOB_ID}`,
          pr,
          isPr,
          prBranch: env.APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH,
          slug: env.APPVEYOR_REPO_NAME,
          root: env.APPVEYOR_BUILD_FOLDER
        };
      }
    };
  }
});

// node_modules/env-ci/lib/utils.js
function prNumber(pr) {
  return (/\d+(?!.*\d+)/.exec(pr) || [])[0];
}
function parseBranch(branch2) {
  return branch2 ? /^(?:refs\/heads\/)?(?<branch>.+)$/i.exec(branch2)[1] : void 0;
}
var init_utils = __esm({
  "node_modules/env-ci/lib/utils.js"() {
  }
});

// node_modules/env-ci/services/azure-pipelines.js
var azure_pipelines_default;
var init_azure_pipelines = __esm({
  "node_modules/env-ci/services/azure-pipelines.js"() {
    init_utils();
    azure_pipelines_default = {
      detect({ env }) {
        return Boolean(env.BUILD_BUILDURI);
      },
      configuration({ env }) {
        const pr = env.SYSTEM_PULLREQUEST_PULLREQUESTID;
        const isPr = Boolean(pr);
        return {
          name: "Azure Pipelines",
          service: "azurePipelines",
          commit: env.BUILD_SOURCEVERSION,
          build: env.BUILD_BUILDNUMBER,
          branch: parseBranch(
            isPr ? env.SYSTEM_PULLREQUEST_TARGETBRANCH : env.BUILD_SOURCEBRANCH
          ),
          pr,
          isPr,
          prBranch: parseBranch(
            isPr ? env.SYSTEM_PULLREQUEST_SOURCEBRANCH : void 0
          ),
          root: env.BUILD_REPOSITORY_LOCALPATH
        };
      }
    };
  }
});

// node_modules/env-ci/services/bamboo.js
var bamboo_default;
var init_bamboo = __esm({
  "node_modules/env-ci/services/bamboo.js"() {
    bamboo_default = {
      detect({ env }) {
        return Boolean(env.bamboo_agentId);
      },
      configuration({ env }) {
        return {
          name: "Bamboo",
          service: "bamboo",
          commit: env.bamboo_planRepository_1_revision,
          build: env.bamboo_buildNumber,
          buildUrl: env.bamboo_buildResultsUrl,
          branch: env.bamboo_planRepository_1_branchName,
          job: env.bamboo_buildKey,
          root: env.bamboo_build_working_directory
        };
      }
    };
  }
});

// node_modules/env-ci/services/bitbucket.js
var bitbucket_default;
var init_bitbucket = __esm({
  "node_modules/env-ci/services/bitbucket.js"() {
    bitbucket_default = {
      detect({ env }) {
        return Boolean(env.BITBUCKET_BUILD_NUMBER);
      },
      configuration({ env }) {
        return {
          name: "Bitbucket Pipelines",
          service: "bitbucket",
          commit: env.BITBUCKET_COMMIT,
          tag: env.BITBUCKET_TAG,
          build: env.BITBUCKET_BUILD_NUMBER,
          buildUrl: `https://bitbucket.org/${env.BITBUCKET_REPO_FULL_NAME}/addon/pipelines/home#!/results/${env.BITBUCKET_BUILD_NUMBER}`,
          branch: env.BITBUCKET_BRANCH,
          slug: env.BITBUCKET_REPO_FULL_NAME,
          root: env.BITBUCKET_CLONE_DIR
        };
      }
    };
  }
});

// node_modules/env-ci/services/bitrise.js
var bitrise_default;
var init_bitrise = __esm({
  "node_modules/env-ci/services/bitrise.js"() {
    bitrise_default = {
      detect({ env }) {
        return Boolean(env.BITRISE_IO);
      },
      configuration({ env }) {
        const pr = env.BITRISE_PULL_REQUEST === "false" ? void 0 : env.BITRISE_PULL_REQUEST;
        const isPr = Boolean(pr);
        return {
          name: "Bitrise",
          service: "bitrise",
          commit: env.BITRISE_GIT_COMMIT,
          tag: env.BITRISE_GIT_TAG,
          build: env.BITRISE_BUILD_NUMBER,
          buildUrl: env.BITRISE_BUILD_URL,
          branch: isPr ? env.BITRISEIO_GIT_BRANCH_DEST : env.BITRISE_GIT_BRANCH,
          pr,
          isPr,
          prBranch: isPr ? env.BITRISE_GIT_BRANCH : void 0,
          slug: env.BITRISE_APP_SLUG
        };
      }
    };
  }
});

// node_modules/env-ci/services/buddy.js
var buddy_default;
var init_buddy = __esm({
  "node_modules/env-ci/services/buddy.js"() {
    init_utils();
    buddy_default = {
      detect({ env }) {
        return Boolean(env.BUDDY_WORKSPACE_ID);
      },
      configuration({ env }) {
        const pr = prNumber(env.BUDDY_EXECUTION_PULL_REQUEST_ID);
        const isPr = Boolean(pr);
        return {
          name: "Buddy",
          service: "buddy",
          commit: env.BUDDY_EXECUTION_REVISION,
          tag: env.BUDDY_EXECUTION_TAG,
          build: env.BUDDY_EXECUTION_ID,
          buildUrl: env.BUDDY_EXECUTION_URL,
          branch: isPr ? env.BUDDY_EXECUTION_PULL_REQUEST_HEAD_BRANCH : env.BUDDY_EXECUTION_BRANCH,
          pr,
          isPr,
          slug: env.BUDDY_REPO_SLUG
        };
      }
    };
  }
});

// node_modules/isexe/windows.js
var require_windows = __commonJS({
  "node_modules/isexe/windows.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs = require("fs");
    function checkPathExt(path3, options) {
      var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
      if (!pathext) {
        return true;
      }
      pathext = pathext.split(";");
      if (pathext.indexOf("") !== -1) {
        return true;
      }
      for (var i = 0; i < pathext.length; i++) {
        var p = pathext[i].toLowerCase();
        if (p && path3.substr(-p.length).toLowerCase() === p) {
          return true;
        }
      }
      return false;
    }
    function checkStat(stat, path3, options) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
      }
      return checkPathExt(path3, options);
    }
    function isexe(path3, options, cb) {
      fs.stat(path3, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path3, options));
      });
    }
    function sync(path3, options) {
      return checkStat(fs.statSync(path3), path3, options);
    }
  }
});

// node_modules/isexe/mode.js
var require_mode = __commonJS({
  "node_modules/isexe/mode.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs = require("fs");
    function isexe(path3, options, cb) {
      fs.stat(path3, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
      });
    }
    function sync(path3, options) {
      return checkStat(fs.statSync(path3), options);
    }
    function checkStat(stat, options) {
      return stat.isFile() && checkMode(stat, options);
    }
    function checkMode(stat, options) {
      var mod = stat.mode;
      var uid = stat.uid;
      var gid = stat.gid;
      var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
      var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
      var u = parseInt("100", 8);
      var g = parseInt("010", 8);
      var o = parseInt("001", 8);
      var ug = u | g;
      var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
  }
});

// node_modules/isexe/index.js
var require_isexe = __commonJS({
  "node_modules/isexe/index.js"(exports, module2) {
    var fs = require("fs");
    var core3;
    if (process.platform === "win32" || global.TESTING_WINDOWS) {
      core3 = require_windows();
    } else {
      core3 = require_mode();
    }
    module2.exports = isexe;
    isexe.sync = sync;
    function isexe(path3, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      if (!cb) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(resolve2, reject) {
          isexe(path3, options || {}, function(er, is) {
            if (er) {
              reject(er);
            } else {
              resolve2(is);
            }
          });
        });
      }
      core3(path3, options || {}, function(er, is) {
        if (er) {
          if (er.code === "EACCES" || options && options.ignoreErrors) {
            er = null;
            is = false;
          }
        }
        cb(er, is);
      });
    }
    function sync(path3, options) {
      try {
        return core3.sync(path3, options || {});
      } catch (er) {
        if (options && options.ignoreErrors || er.code === "EACCES") {
          return false;
        } else {
          throw er;
        }
      }
    }
  }
});

// node_modules/which/which.js
var require_which = __commonJS({
  "node_modules/which/which.js"(exports, module2) {
    var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
    var path3 = require("path");
    var COLON = isWindows ? ";" : ":";
    var isexe = require_isexe();
    var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
    var getPathInfo = (cmd, opt) => {
      const colon = opt.colon || COLON;
      const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
        // windows always checks the cwd first
        ...isWindows ? [process.cwd()] : [],
        ...(opt.path || process.env.PATH || /* istanbul ignore next: very unusual */
        "").split(colon)
      ];
      const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
      const pathExt = isWindows ? pathExtExe.split(colon) : [""];
      if (isWindows) {
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
          pathExt.unshift("");
      }
      return {
        pathEnv,
        pathExt,
        pathExtExe
      };
    };
    var which = (cmd, opt, cb) => {
      if (typeof opt === "function") {
        cb = opt;
        opt = {};
      }
      if (!opt)
        opt = {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      const step = (i) => new Promise((resolve2, reject) => {
        if (i === pathEnv.length)
          return opt.all && found.length ? resolve2(found) : reject(getNotFoundError(cmd));
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path3.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve2(subStep(p, i, 0));
      });
      const subStep = (p, i, ii) => new Promise((resolve2, reject) => {
        if (ii === pathExt.length)
          return resolve2(step(i + 1));
        const ext = pathExt[ii];
        isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
          if (!er && is) {
            if (opt.all)
              found.push(p + ext);
            else
              return resolve2(p + ext);
          }
          return resolve2(subStep(p, i, ii + 1));
        });
      });
      return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
    };
    var whichSync = (cmd, opt) => {
      opt = opt || {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (let i = 0; i < pathEnv.length; i++) {
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path3.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for (let j = 0; j < pathExt.length; j++) {
          const cur = p + pathExt[j];
          try {
            const is = isexe.sync(cur, { pathExt: pathExtExe });
            if (is) {
              if (opt.all)
                found.push(cur);
              else
                return cur;
            }
          } catch (ex) {
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    };
    module2.exports = which;
    which.sync = whichSync;
  }
});

// node_modules/path-key/index.js
var require_path_key = __commonJS({
  "node_modules/path-key/index.js"(exports, module2) {
    "use strict";
    var pathKey2 = (options = {}) => {
      const environment = options.env || process.env;
      const platform = options.platform || process.platform;
      if (platform !== "win32") {
        return "PATH";
      }
      return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
    };
    module2.exports = pathKey2;
    module2.exports.default = pathKey2;
  }
});

// node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS({
  "node_modules/cross-spawn/lib/util/resolveCommand.js"(exports, module2) {
    "use strict";
    var path3 = require("path");
    var which = require_which();
    var getPathKey = require_path_key();
    function resolveCommandAttempt(parsed, withoutPathExt) {
      const env = parsed.options.env || process.env;
      const cwd = process.cwd();
      const hasCustomCwd = parsed.options.cwd != null;
      const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
      if (shouldSwitchCwd) {
        try {
          process.chdir(parsed.options.cwd);
        } catch (err) {
        }
      }
      let resolved;
      try {
        resolved = which.sync(parsed.command, {
          path: env[getPathKey({ env })],
          pathExt: withoutPathExt ? path3.delimiter : void 0
        });
      } catch (e) {
      } finally {
        if (shouldSwitchCwd) {
          process.chdir(cwd);
        }
      }
      if (resolved) {
        resolved = path3.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
      }
      return resolved;
    }
    function resolveCommand(parsed) {
      return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    module2.exports = resolveCommand;
  }
});

// node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS({
  "node_modules/cross-spawn/lib/util/escape.js"(exports, module2) {
    "use strict";
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
      arg = arg.replace(metaCharsRegExp, "^$1");
      return arg;
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
      arg = `${arg}`;
      arg = arg.replace(/(\\*)"/g, '$1$1\\"');
      arg = arg.replace(/(\\*)$/, "$1$1");
      arg = `"${arg}"`;
      arg = arg.replace(metaCharsRegExp, "^$1");
      if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, "^$1");
      }
      return arg;
    }
    module2.exports.command = escapeCommand;
    module2.exports.argument = escapeArgument;
  }
});

// node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS({
  "node_modules/shebang-regex/index.js"(exports, module2) {
    "use strict";
    module2.exports = /^#!(.*)/;
  }
});

// node_modules/shebang-command/index.js
var require_shebang_command = __commonJS({
  "node_modules/shebang-command/index.js"(exports, module2) {
    "use strict";
    var shebangRegex = require_shebang_regex();
    module2.exports = (string = "") => {
      const match = string.match(shebangRegex);
      if (!match) {
        return null;
      }
      const [path3, argument] = match[0].replace(/#! ?/, "").split(" ");
      const binary = path3.split("/").pop();
      if (binary === "env") {
        return argument;
      }
      return argument ? `${binary} ${argument}` : binary;
    };
  }
});

// node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS({
  "node_modules/cross-spawn/lib/util/readShebang.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var shebangCommand = require_shebang_command();
    function readShebang(command) {
      const size = 150;
      const buffer = Buffer.alloc(size);
      let fd;
      try {
        fd = fs.openSync(command, "r");
        fs.readSync(fd, buffer, 0, size, 0);
        fs.closeSync(fd);
      } catch (e) {
      }
      return shebangCommand(buffer.toString());
    }
    module2.exports = readShebang;
  }
});

// node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS({
  "node_modules/cross-spawn/lib/parse.js"(exports, module2) {
    "use strict";
    var path3 = require("path");
    var resolveCommand = require_resolveCommand();
    var escape = require_escape();
    var readShebang = require_readShebang();
    var isWin = process.platform === "win32";
    var isExecutableRegExp = /\.(?:com|exe)$/i;
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    function detectShebang(parsed) {
      parsed.file = resolveCommand(parsed);
      const shebang = parsed.file && readShebang(parsed.file);
      if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return resolveCommand(parsed);
      }
      return parsed.file;
    }
    function parseNonShell(parsed) {
      if (!isWin) {
        return parsed;
      }
      const commandFile = detectShebang(parsed);
      const needsShell = !isExecutableRegExp.test(commandFile);
      if (parsed.options.forceShell || needsShell) {
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
        parsed.command = path3.normalize(parsed.command);
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
        const shellCommand = [parsed.command].concat(parsed.args).join(" ");
        parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
        parsed.command = process.env.comspec || "cmd.exe";
        parsed.options.windowsVerbatimArguments = true;
      }
      return parsed;
    }
    function parse2(command, args, options) {
      if (args && !Array.isArray(args)) {
        options = args;
        args = null;
      }
      args = args ? args.slice(0) : [];
      options = Object.assign({}, options);
      const parsed = {
        command,
        args,
        options,
        file: void 0,
        original: {
          command,
          args
        }
      };
      return options.shell ? parsed : parseNonShell(parsed);
    }
    module2.exports = parse2;
  }
});

// node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS({
  "node_modules/cross-spawn/lib/enoent.js"(exports, module2) {
    "use strict";
    var isWin = process.platform === "win32";
    function notFoundError(original, syscall) {
      return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
      });
    }
    function hookChildProcess(cp, parsed) {
      if (!isWin) {
        return;
      }
      const originalEmit = cp.emit;
      cp.emit = function(name, arg1) {
        if (name === "exit") {
          const err = verifyENOENT(arg1, parsed, "spawn");
          if (err) {
            return originalEmit.call(cp, "error", err);
          }
        }
        return originalEmit.apply(cp, arguments);
      };
    }
    function verifyENOENT(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawn");
      }
      return null;
    }
    function verifyENOENTSync(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawnSync");
      }
      return null;
    }
    module2.exports = {
      hookChildProcess,
      verifyENOENT,
      verifyENOENTSync,
      notFoundError
    };
  }
});

// node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS({
  "node_modules/cross-spawn/index.js"(exports, module2) {
    "use strict";
    var cp = require("child_process");
    var parse2 = require_parse();
    var enoent = require_enoent();
    function spawn3(command, args, options) {
      const parsed = parse2(command, args, options);
      const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
      enoent.hookChildProcess(spawned, parsed);
      return spawned;
    }
    function spawnSync(command, args, options) {
      const parsed = parse2(command, args, options);
      const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
      result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
      return result;
    }
    module2.exports = spawn3;
    module2.exports.spawn = spawn3;
    module2.exports.sync = spawnSync;
    module2.exports._parse = parse2;
    module2.exports._enoent = enoent;
  }
});

// node_modules/strip-final-newline/index.js
function stripFinalNewline(input) {
  const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
  const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
  if (input[input.length - 1] === LF) {
    input = input.slice(0, -1);
  }
  if (input[input.length - 1] === CR) {
    input = input.slice(0, -1);
  }
  return input;
}
var init_strip_final_newline = __esm({
  "node_modules/strip-final-newline/index.js"() {
  }
});

// node_modules/npm-run-path/node_modules/path-key/index.js
function pathKey(options = {}) {
  const {
    env = process.env,
    platform = process.platform
  } = options;
  if (platform !== "win32") {
    return "PATH";
  }
  return Object.keys(env).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
}
var init_path_key = __esm({
  "node_modules/npm-run-path/node_modules/path-key/index.js"() {
  }
});

// node_modules/npm-run-path/index.js
function npmRunPath(options = {}) {
  const {
    cwd = import_node_process.default.cwd(),
    path: path_ = import_node_process.default.env[pathKey()],
    execPath = import_node_process.default.execPath
  } = options;
  let previous;
  const cwdString = cwd instanceof URL ? import_node_url.default.fileURLToPath(cwd) : cwd;
  let cwdPath = import_node_path.default.resolve(cwdString);
  const result = [];
  while (previous !== cwdPath) {
    result.push(import_node_path.default.join(cwdPath, "node_modules/.bin"));
    previous = cwdPath;
    cwdPath = import_node_path.default.resolve(cwdPath, "..");
  }
  result.push(import_node_path.default.resolve(cwdString, execPath, ".."));
  return [...result, path_].join(import_node_path.default.delimiter);
}
function npmRunPathEnv({ env = import_node_process.default.env, ...options } = {}) {
  env = { ...env };
  const path3 = pathKey({ env });
  options.path = env[path3];
  env[path3] = npmRunPath(options);
  return env;
}
var import_node_process, import_node_path, import_node_url;
var init_npm_run_path = __esm({
  "node_modules/npm-run-path/index.js"() {
    import_node_process = __toESM(require("node:process"), 1);
    import_node_path = __toESM(require("node:path"), 1);
    import_node_url = __toESM(require("node:url"), 1);
    init_path_key();
  }
});

// node_modules/mimic-fn/index.js
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}
var copyProperty, canCopyProperty, changePrototype, wrappedToString, toStringDescriptor, toStringName, changeToString;
var init_mimic_fn = __esm({
  "node_modules/mimic-fn/index.js"() {
    copyProperty = (to, from, property, ignoreNonConfigurable) => {
      if (property === "length" || property === "prototype") {
        return;
      }
      if (property === "arguments" || property === "caller") {
        return;
      }
      const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
      const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
      if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
        return;
      }
      Object.defineProperty(to, property, fromDescriptor);
    };
    canCopyProperty = function(toDescriptor, fromDescriptor) {
      return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
    };
    changePrototype = (to, from) => {
      const fromPrototype = Object.getPrototypeOf(from);
      if (fromPrototype === Object.getPrototypeOf(to)) {
        return;
      }
      Object.setPrototypeOf(to, fromPrototype);
    };
    wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
    toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
    toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
    changeToString = (to, from, name) => {
      const withName = name === "" ? "" : `with ${name.trim()}() `;
      const newToString = wrappedToString.bind(null, withName, from.toString());
      Object.defineProperty(newToString, "name", toStringName);
      Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });
    };
  }
});

// node_modules/onetime/index.js
var calledFunctions, onetime, onetime_default;
var init_onetime = __esm({
  "node_modules/onetime/index.js"() {
    init_mimic_fn();
    calledFunctions = /* @__PURE__ */ new WeakMap();
    onetime = (function_, options = {}) => {
      if (typeof function_ !== "function") {
        throw new TypeError("Expected a function");
      }
      let returnValue;
      let callCount = 0;
      const functionName = function_.displayName || function_.name || "<anonymous>";
      const onetime2 = function(...arguments_) {
        calledFunctions.set(onetime2, ++callCount);
        if (callCount === 1) {
          returnValue = function_.apply(this, arguments_);
          function_ = null;
        } else if (options.throw === true) {
          throw new Error(`Function \`${functionName}\` can only be called once`);
        }
        return returnValue;
      };
      mimicFunction(onetime2, function_);
      calledFunctions.set(onetime2, callCount);
      return onetime2;
    };
    onetime.callCount = (function_) => {
      if (!calledFunctions.has(function_)) {
        throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
      }
      return calledFunctions.get(function_);
    };
    onetime_default = onetime;
  }
});

// node_modules/env-ci/node_modules/human-signals/build/src/realtime.js
var getRealtimeSignals, getRealtimeSignal, SIGRTMIN, SIGRTMAX;
var init_realtime = __esm({
  "node_modules/env-ci/node_modules/human-signals/build/src/realtime.js"() {
    getRealtimeSignals = () => {
      const length = SIGRTMAX - SIGRTMIN + 1;
      return Array.from({ length }, getRealtimeSignal);
    };
    getRealtimeSignal = (value, index) => ({
      name: `SIGRT${index + 1}`,
      number: SIGRTMIN + index,
      action: "terminate",
      description: "Application-specific signal (realtime)",
      standard: "posix"
    });
    SIGRTMIN = 34;
    SIGRTMAX = 64;
  }
});

// node_modules/env-ci/node_modules/human-signals/build/src/core.js
var SIGNALS;
var init_core = __esm({
  "node_modules/env-ci/node_modules/human-signals/build/src/core.js"() {
    SIGNALS = [
      {
        name: "SIGHUP",
        number: 1,
        action: "terminate",
        description: "Terminal closed",
        standard: "posix"
      },
      {
        name: "SIGINT",
        number: 2,
        action: "terminate",
        description: "User interruption with CTRL-C",
        standard: "ansi"
      },
      {
        name: "SIGQUIT",
        number: 3,
        action: "core",
        description: "User interruption with CTRL-\\",
        standard: "posix"
      },
      {
        name: "SIGILL",
        number: 4,
        action: "core",
        description: "Invalid machine instruction",
        standard: "ansi"
      },
      {
        name: "SIGTRAP",
        number: 5,
        action: "core",
        description: "Debugger breakpoint",
        standard: "posix"
      },
      {
        name: "SIGABRT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "ansi"
      },
      {
        name: "SIGIOT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "bsd"
      },
      {
        name: "SIGBUS",
        number: 7,
        action: "core",
        description: "Bus error due to misaligned, non-existing address or paging error",
        standard: "bsd"
      },
      {
        name: "SIGEMT",
        number: 7,
        action: "terminate",
        description: "Command should be emulated but is not implemented",
        standard: "other"
      },
      {
        name: "SIGFPE",
        number: 8,
        action: "core",
        description: "Floating point arithmetic error",
        standard: "ansi"
      },
      {
        name: "SIGKILL",
        number: 9,
        action: "terminate",
        description: "Forced termination",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGUSR1",
        number: 10,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      },
      {
        name: "SIGSEGV",
        number: 11,
        action: "core",
        description: "Segmentation fault",
        standard: "ansi"
      },
      {
        name: "SIGUSR2",
        number: 12,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      },
      {
        name: "SIGPIPE",
        number: 13,
        action: "terminate",
        description: "Broken pipe or socket",
        standard: "posix"
      },
      {
        name: "SIGALRM",
        number: 14,
        action: "terminate",
        description: "Timeout or timer",
        standard: "posix"
      },
      {
        name: "SIGTERM",
        number: 15,
        action: "terminate",
        description: "Termination",
        standard: "ansi"
      },
      {
        name: "SIGSTKFLT",
        number: 16,
        action: "terminate",
        description: "Stack is empty or overflowed",
        standard: "other"
      },
      {
        name: "SIGCHLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "posix"
      },
      {
        name: "SIGCLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "other"
      },
      {
        name: "SIGCONT",
        number: 18,
        action: "unpause",
        description: "Unpaused",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGSTOP",
        number: 19,
        action: "pause",
        description: "Paused",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGTSTP",
        number: 20,
        action: "pause",
        description: 'Paused using CTRL-Z or "suspend"',
        standard: "posix"
      },
      {
        name: "SIGTTIN",
        number: 21,
        action: "pause",
        description: "Background process cannot read terminal input",
        standard: "posix"
      },
      {
        name: "SIGBREAK",
        number: 21,
        action: "terminate",
        description: "User interruption with CTRL-BREAK",
        standard: "other"
      },
      {
        name: "SIGTTOU",
        number: 22,
        action: "pause",
        description: "Background process cannot write to terminal output",
        standard: "posix"
      },
      {
        name: "SIGURG",
        number: 23,
        action: "ignore",
        description: "Socket received out-of-band data",
        standard: "bsd"
      },
      {
        name: "SIGXCPU",
        number: 24,
        action: "core",
        description: "Process timed out",
        standard: "bsd"
      },
      {
        name: "SIGXFSZ",
        number: 25,
        action: "core",
        description: "File too big",
        standard: "bsd"
      },
      {
        name: "SIGVTALRM",
        number: 26,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      },
      {
        name: "SIGPROF",
        number: 27,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      },
      {
        name: "SIGWINCH",
        number: 28,
        action: "ignore",
        description: "Terminal window size changed",
        standard: "bsd"
      },
      {
        name: "SIGIO",
        number: 29,
        action: "terminate",
        description: "I/O is available",
        standard: "other"
      },
      {
        name: "SIGPOLL",
        number: 29,
        action: "terminate",
        description: "Watched event",
        standard: "other"
      },
      {
        name: "SIGINFO",
        number: 29,
        action: "ignore",
        description: "Request for process information",
        standard: "other"
      },
      {
        name: "SIGPWR",
        number: 30,
        action: "terminate",
        description: "Device running out of power",
        standard: "systemv"
      },
      {
        name: "SIGSYS",
        number: 31,
        action: "core",
        description: "Invalid system call",
        standard: "other"
      },
      {
        name: "SIGUNUSED",
        number: 31,
        action: "terminate",
        description: "Invalid system call",
        standard: "other"
      }
    ];
  }
});

// node_modules/env-ci/node_modules/human-signals/build/src/signals.js
var import_node_os, getSignals, normalizeSignal;
var init_signals = __esm({
  "node_modules/env-ci/node_modules/human-signals/build/src/signals.js"() {
    import_node_os = require("node:os");
    init_core();
    init_realtime();
    getSignals = () => {
      const realtimeSignals = getRealtimeSignals();
      const signals2 = [...SIGNALS, ...realtimeSignals].map(normalizeSignal);
      return signals2;
    };
    normalizeSignal = ({
      name,
      number: defaultNumber,
      description,
      action,
      forced = false,
      standard
    }) => {
      const {
        signals: { [name]: constantSignal }
      } = import_node_os.constants;
      const supported = constantSignal !== void 0;
      const number = supported ? constantSignal : defaultNumber;
      return { name, number, description, supported, action, forced, standard };
    };
  }
});

// node_modules/env-ci/node_modules/human-signals/build/src/main.js
var import_node_os2, getSignalsByName, getSignalByName, signalsByName, getSignalsByNumber, getSignalByNumber, findSignalByNumber, signalsByNumber;
var init_main = __esm({
  "node_modules/env-ci/node_modules/human-signals/build/src/main.js"() {
    import_node_os2 = require("node:os");
    init_realtime();
    init_signals();
    getSignalsByName = () => {
      const signals2 = getSignals();
      return Object.fromEntries(signals2.map(getSignalByName));
    };
    getSignalByName = ({
      name,
      number,
      description,
      supported,
      action,
      forced,
      standard
    }) => [name, { name, number, description, supported, action, forced, standard }];
    signalsByName = getSignalsByName();
    getSignalsByNumber = () => {
      const signals2 = getSignals();
      const length = SIGRTMAX + 1;
      const signalsA = Array.from(
        { length },
        (value, number) => getSignalByNumber(number, signals2)
      );
      return Object.assign({}, ...signalsA);
    };
    getSignalByNumber = (number, signals2) => {
      const signal = findSignalByNumber(number, signals2);
      if (signal === void 0) {
        return {};
      }
      const { name, description, supported, action, forced, standard } = signal;
      return {
        [number]: {
          name,
          number,
          description,
          supported,
          action,
          forced,
          standard
        }
      };
    };
    findSignalByNumber = (number, signals2) => {
      const signal = signals2.find(({ name }) => import_node_os2.constants.signals[name] === number);
      if (signal !== void 0) {
        return signal;
      }
      return signals2.find((signalA) => signalA.number === number);
    };
    signalsByNumber = getSignalsByNumber();
  }
});

// node_modules/env-ci/node_modules/execa/lib/error.js
var import_node_process2, getErrorPrefix, makeError;
var init_error = __esm({
  "node_modules/env-ci/node_modules/execa/lib/error.js"() {
    import_node_process2 = __toESM(require("node:process"), 1);
    init_main();
    getErrorPrefix = ({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled }) => {
      if (timedOut) {
        return `timed out after ${timeout} milliseconds`;
      }
      if (isCanceled) {
        return "was canceled";
      }
      if (errorCode !== void 0) {
        return `failed with ${errorCode}`;
      }
      if (signal !== void 0) {
        return `was killed with ${signal} (${signalDescription})`;
      }
      if (exitCode !== void 0) {
        return `failed with exit code ${exitCode}`;
      }
      return "failed";
    };
    makeError = ({
      stdout,
      stderr,
      all,
      error,
      signal,
      exitCode,
      command,
      escapedCommand,
      timedOut,
      isCanceled,
      killed,
      parsed: { options: { timeout, cwd = import_node_process2.default.cwd() } }
    }) => {
      exitCode = exitCode === null ? void 0 : exitCode;
      signal = signal === null ? void 0 : signal;
      const signalDescription = signal === void 0 ? void 0 : signalsByName[signal].description;
      const errorCode = error && error.code;
      const prefix = getErrorPrefix({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled });
      const execaMessage = `Command ${prefix}: ${command}`;
      const isError = Object.prototype.toString.call(error) === "[object Error]";
      const shortMessage = isError ? `${execaMessage}
${error.message}` : execaMessage;
      const message = [shortMessage, stderr, stdout].filter(Boolean).join("\n");
      if (isError) {
        error.originalMessage = error.message;
        error.message = message;
      } else {
        error = new Error(message);
      }
      error.shortMessage = shortMessage;
      error.command = command;
      error.escapedCommand = escapedCommand;
      error.exitCode = exitCode;
      error.signal = signal;
      error.signalDescription = signalDescription;
      error.stdout = stdout;
      error.stderr = stderr;
      error.cwd = cwd;
      if (all !== void 0) {
        error.all = all;
      }
      if ("bufferedData" in error) {
        delete error.bufferedData;
      }
      error.failed = true;
      error.timedOut = Boolean(timedOut);
      error.isCanceled = isCanceled;
      error.killed = killed && !timedOut;
      return error;
    };
  }
});

// node_modules/env-ci/node_modules/execa/lib/stdio.js
var aliases, hasAlias, normalizeStdio;
var init_stdio = __esm({
  "node_modules/env-ci/node_modules/execa/lib/stdio.js"() {
    aliases = ["stdin", "stdout", "stderr"];
    hasAlias = (options) => aliases.some((alias) => options[alias] !== void 0);
    normalizeStdio = (options) => {
      if (!options) {
        return;
      }
      const { stdio } = options;
      if (stdio === void 0) {
        return aliases.map((alias) => options[alias]);
      }
      if (hasAlias(options)) {
        throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias) => `\`${alias}\``).join(", ")}`);
      }
      if (typeof stdio === "string") {
        return stdio;
      }
      if (!Array.isArray(stdio)) {
        throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
      }
      const length = Math.max(stdio.length, aliases.length);
      return Array.from({ length }, (value, index) => stdio[index]);
    };
  }
});

// node_modules/env-ci/node_modules/signal-exit/dist/mjs/signals.js
var signals;
var init_signals2 = __esm({
  "node_modules/env-ci/node_modules/signal-exit/dist/mjs/signals.js"() {
    signals = [];
    signals.push("SIGHUP", "SIGINT", "SIGTERM");
    if (process.platform !== "win32") {
      signals.push(
        "SIGALRM",
        "SIGABRT",
        "SIGVTALRM",
        "SIGXCPU",
        "SIGXFSZ",
        "SIGUSR2",
        "SIGTRAP",
        "SIGSYS",
        "SIGQUIT",
        "SIGIOT"
        // should detect profiler and enable/disable accordingly.
        // see #21
        // 'SIGPROF'
      );
    }
    if (process.platform === "linux") {
      signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
    }
  }
});

// node_modules/env-ci/node_modules/signal-exit/dist/mjs/index.js
var processOk, kExitEmitter, global2, ObjectDefineProperty, Emitter, SignalExitBase, signalExitWrap, SignalExitFallback, SignalExit, process4, onExit, load, unload;
var init_mjs = __esm({
  "node_modules/env-ci/node_modules/signal-exit/dist/mjs/index.js"() {
    init_signals2();
    processOk = (process7) => !!process7 && typeof process7 === "object" && typeof process7.removeListener === "function" && typeof process7.emit === "function" && typeof process7.reallyExit === "function" && typeof process7.listeners === "function" && typeof process7.kill === "function" && typeof process7.pid === "number" && typeof process7.on === "function";
    kExitEmitter = Symbol.for("signal-exit emitter");
    global2 = globalThis;
    ObjectDefineProperty = Object.defineProperty.bind(Object);
    Emitter = class {
      emitted = {
        afterExit: false,
        exit: false
      };
      listeners = {
        afterExit: [],
        exit: []
      };
      count = 0;
      id = Math.random();
      constructor() {
        if (global2[kExitEmitter]) {
          return global2[kExitEmitter];
        }
        ObjectDefineProperty(global2, kExitEmitter, {
          value: this,
          writable: false,
          enumerable: false,
          configurable: false
        });
      }
      on(ev, fn) {
        this.listeners[ev].push(fn);
      }
      removeListener(ev, fn) {
        const list = this.listeners[ev];
        const i = list.indexOf(fn);
        if (i === -1) {
          return;
        }
        if (i === 0 && list.length === 1) {
          list.length = 0;
        } else {
          list.splice(i, 1);
        }
      }
      emit(ev, code, signal) {
        if (this.emitted[ev]) {
          return false;
        }
        this.emitted[ev] = true;
        let ret = false;
        for (const fn of this.listeners[ev]) {
          ret = fn(code, signal) === true || ret;
        }
        if (ev === "exit") {
          ret = this.emit("afterExit", code, signal) || ret;
        }
        return ret;
      }
    };
    SignalExitBase = class {
    };
    signalExitWrap = (handler) => {
      return {
        onExit(cb, opts) {
          return handler.onExit(cb, opts);
        },
        load() {
          return handler.load();
        },
        unload() {
          return handler.unload();
        }
      };
    };
    SignalExitFallback = class extends SignalExitBase {
      onExit() {
        return () => {
        };
      }
      load() {
      }
      unload() {
      }
    };
    SignalExit = class extends SignalExitBase {
      // "SIGHUP" throws an `ENOSYS` error on Windows,
      // so use a supported signal instead
      /* c8 ignore start */
      #hupSig = process4.platform === "win32" ? "SIGINT" : "SIGHUP";
      /* c8 ignore stop */
      #emitter = new Emitter();
      #process;
      #originalProcessEmit;
      #originalProcessReallyExit;
      #sigListeners = {};
      #loaded = false;
      constructor(process7) {
        super();
        this.#process = process7;
        this.#sigListeners = {};
        for (const sig of signals) {
          this.#sigListeners[sig] = () => {
            const listeners = this.#process.listeners(sig);
            let { count } = this.#emitter;
            const p = process7;
            if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
              count += p.__signal_exit_emitter__.count;
            }
            if (listeners.length === count) {
              this.unload();
              const ret = this.#emitter.emit("exit", null, sig);
              const s = sig === "SIGHUP" ? this.#hupSig : sig;
              if (!ret)
                process7.kill(process7.pid, s);
            }
          };
        }
        this.#originalProcessReallyExit = process7.reallyExit;
        this.#originalProcessEmit = process7.emit;
      }
      onExit(cb, opts) {
        if (!processOk(this.#process)) {
          return () => {
          };
        }
        if (this.#loaded === false) {
          this.load();
        }
        const ev = opts?.alwaysLast ? "afterExit" : "exit";
        this.#emitter.on(ev, cb);
        return () => {
          this.#emitter.removeListener(ev, cb);
          if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
            this.unload();
          }
        };
      }
      load() {
        if (this.#loaded) {
          return;
        }
        this.#loaded = true;
        this.#emitter.count += 1;
        for (const sig of signals) {
          try {
            const fn = this.#sigListeners[sig];
            if (fn)
              this.#process.on(sig, fn);
          } catch (_) {
          }
        }
        this.#process.emit = (ev, ...a) => {
          return this.#processEmit(ev, ...a);
        };
        this.#process.reallyExit = (code) => {
          return this.#processReallyExit(code);
        };
      }
      unload() {
        if (!this.#loaded) {
          return;
        }
        this.#loaded = false;
        signals.forEach((sig) => {
          const listener = this.#sigListeners[sig];
          if (!listener) {
            throw new Error("Listener not defined for signal: " + sig);
          }
          try {
            this.#process.removeListener(sig, listener);
          } catch (_) {
          }
        });
        this.#process.emit = this.#originalProcessEmit;
        this.#process.reallyExit = this.#originalProcessReallyExit;
        this.#emitter.count -= 1;
      }
      #processReallyExit(code) {
        if (!processOk(this.#process)) {
          return 0;
        }
        this.#process.exitCode = code || 0;
        this.#emitter.emit("exit", this.#process.exitCode, null);
        return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
      }
      #processEmit(ev, ...args) {
        const og = this.#originalProcessEmit;
        if (ev === "exit" && processOk(this.#process)) {
          if (typeof args[0] === "number") {
            this.#process.exitCode = args[0];
          }
          const ret = og.call(this.#process, ev, ...args);
          this.#emitter.emit("exit", this.#process.exitCode, null);
          return ret;
        } else {
          return og.call(this.#process, ev, ...args);
        }
      }
    };
    process4 = globalThis.process;
    ({
      onExit: (
        /**
         * Called when the process is exiting, whether via signal, explicit
         * exit, or running out of stuff to do.
         *
         * If the global process object is not suitable for instrumentation,
         * then this will be a no-op.
         *
         * Returns a function that may be used to unload signal-exit.
         */
        onExit
      ),
      load: (
        /**
         * Load the listeners.  Likely you never need to call this, unless
         * doing a rather deep integration with signal-exit functionality.
         * Mostly exposed for the benefit of testing.
         *
         * @internal
         */
        load
      ),
      unload: (
        /**
         * Unload the listeners.  Likely you never need to call this, unless
         * doing a rather deep integration with signal-exit functionality.
         * Mostly exposed for the benefit of testing.
         *
         * @internal
         */
        unload
      )
    } = signalExitWrap(processOk(process4) ? new SignalExit(process4) : new SignalExitFallback()));
  }
});

// node_modules/env-ci/node_modules/execa/lib/kill.js
var import_node_os3, DEFAULT_FORCE_KILL_TIMEOUT, spawnedKill, setKillTimeout, shouldForceKill, isSigterm, getForceKillAfterTimeout, spawnedCancel, timeoutKill, setupTimeout, validateTimeout, setExitHandler;
var init_kill = __esm({
  "node_modules/env-ci/node_modules/execa/lib/kill.js"() {
    import_node_os3 = __toESM(require("node:os"), 1);
    init_mjs();
    DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
    spawnedKill = (kill, signal = "SIGTERM", options = {}) => {
      const killResult = kill(signal);
      setKillTimeout(kill, signal, options, killResult);
      return killResult;
    };
    setKillTimeout = (kill, signal, options, killResult) => {
      if (!shouldForceKill(signal, options, killResult)) {
        return;
      }
      const timeout = getForceKillAfterTimeout(options);
      const t = setTimeout(() => {
        kill("SIGKILL");
      }, timeout);
      if (t.unref) {
        t.unref();
      }
    };
    shouldForceKill = (signal, { forceKillAfterTimeout }, killResult) => isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
    isSigterm = (signal) => signal === import_node_os3.default.constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
    getForceKillAfterTimeout = ({ forceKillAfterTimeout = true }) => {
      if (forceKillAfterTimeout === true) {
        return DEFAULT_FORCE_KILL_TIMEOUT;
      }
      if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
        throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
      }
      return forceKillAfterTimeout;
    };
    spawnedCancel = (spawned, context) => {
      const killResult = spawned.kill();
      if (killResult) {
        context.isCanceled = true;
      }
    };
    timeoutKill = (spawned, signal, reject) => {
      spawned.kill(signal);
      reject(Object.assign(new Error("Timed out"), { timedOut: true, signal }));
    };
    setupTimeout = (spawned, { timeout, killSignal = "SIGTERM" }, spawnedPromise) => {
      if (timeout === 0 || timeout === void 0) {
        return spawnedPromise;
      }
      let timeoutId;
      const timeoutPromise = new Promise((resolve2, reject) => {
        timeoutId = setTimeout(() => {
          timeoutKill(spawned, killSignal, reject);
        }, timeout);
      });
      const safeSpawnedPromise = spawnedPromise.finally(() => {
        clearTimeout(timeoutId);
      });
      return Promise.race([timeoutPromise, safeSpawnedPromise]);
    };
    validateTimeout = ({ timeout }) => {
      if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
        throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
      }
    };
    setExitHandler = async (spawned, { cleanup, detached }, timedPromise) => {
      if (!cleanup || detached) {
        return timedPromise;
      }
      const removeExitHandler = onExit(() => {
        spawned.kill();
      });
      return timedPromise.finally(() => {
        removeExitHandler();
      });
    };
  }
});

// node_modules/is-stream/index.js
function isStream(stream) {
  return stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
}
function isWritableStream(stream) {
  return isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
}
var init_is_stream = __esm({
  "node_modules/is-stream/index.js"() {
  }
});

// node_modules/env-ci/node_modules/execa/lib/pipe.js
var import_node_fs, import_node_child_process, isExecaChildProcess, pipeToTarget, addPipeMethods;
var init_pipe = __esm({
  "node_modules/env-ci/node_modules/execa/lib/pipe.js"() {
    import_node_fs = require("node:fs");
    import_node_child_process = require("node:child_process");
    init_is_stream();
    isExecaChildProcess = (target) => target instanceof import_node_child_process.ChildProcess && typeof target.then === "function";
    pipeToTarget = (spawned, streamName, target) => {
      if (typeof target === "string") {
        spawned[streamName].pipe((0, import_node_fs.createWriteStream)(target));
        return spawned;
      }
      if (isWritableStream(target)) {
        spawned[streamName].pipe(target);
        return spawned;
      }
      if (!isExecaChildProcess(target)) {
        throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
      }
      if (!isWritableStream(target.stdin)) {
        throw new TypeError("The target child process's stdin must be available.");
      }
      spawned[streamName].pipe(target.stdin);
      return target;
    };
    addPipeMethods = (spawned) => {
      if (spawned.stdout !== null) {
        spawned.pipeStdout = pipeToTarget.bind(void 0, spawned, "stdout");
      }
      if (spawned.stderr !== null) {
        spawned.pipeStderr = pipeToTarget.bind(void 0, spawned, "stderr");
      }
      if (spawned.all !== void 0) {
        spawned.pipeAll = pipeToTarget.bind(void 0, spawned, "all");
      }
    };
  }
});

// node_modules/env-ci/node_modules/get-stream/source/contents.js
var getStreamContents, appendFinalChunk, appendChunk, addNewChunk, isAsyncIterable, getChunkType, objectToString, MaxBufferError;
var init_contents = __esm({
  "node_modules/env-ci/node_modules/get-stream/source/contents.js"() {
    getStreamContents = async (stream, { init, convertChunk, getSize, truncateChunk, addChunk, getFinalChunk, finalize }, { maxBuffer = Number.POSITIVE_INFINITY } = {}) => {
      if (!isAsyncIterable(stream)) {
        throw new Error("The first argument must be a Readable, a ReadableStream, or an async iterable.");
      }
      const state = init();
      state.length = 0;
      try {
        for await (const chunk of stream) {
          const chunkType = getChunkType(chunk);
          const convertedChunk = convertChunk[chunkType](chunk, state);
          appendChunk({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer });
        }
        appendFinalChunk({ state, convertChunk, getSize, truncateChunk, addChunk, getFinalChunk, maxBuffer });
        return finalize(state);
      } catch (error) {
        error.bufferedData = finalize(state);
        throw error;
      }
    };
    appendFinalChunk = ({ state, getSize, truncateChunk, addChunk, getFinalChunk, maxBuffer }) => {
      const convertedChunk = getFinalChunk(state);
      if (convertedChunk !== void 0) {
        appendChunk({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer });
      }
    };
    appendChunk = ({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer }) => {
      const chunkSize = getSize(convertedChunk);
      const newLength = state.length + chunkSize;
      if (newLength <= maxBuffer) {
        addNewChunk(convertedChunk, state, addChunk, newLength);
        return;
      }
      const truncatedChunk = truncateChunk(convertedChunk, maxBuffer - state.length);
      if (truncatedChunk !== void 0) {
        addNewChunk(truncatedChunk, state, addChunk, maxBuffer);
      }
      throw new MaxBufferError();
    };
    addNewChunk = (convertedChunk, state, addChunk, newLength) => {
      state.contents = addChunk(convertedChunk, state, newLength);
      state.length = newLength;
    };
    isAsyncIterable = (stream) => typeof stream === "object" && stream !== null && typeof stream[Symbol.asyncIterator] === "function";
    getChunkType = (chunk) => {
      const typeOfChunk = typeof chunk;
      if (typeOfChunk === "string") {
        return "string";
      }
      if (typeOfChunk !== "object" || chunk === null) {
        return "others";
      }
      if (globalThis.Buffer?.isBuffer(chunk)) {
        return "buffer";
      }
      const prototypeName = objectToString.call(chunk);
      if (prototypeName === "[object ArrayBuffer]") {
        return "arrayBuffer";
      }
      if (prototypeName === "[object DataView]") {
        return "dataView";
      }
      if (Number.isInteger(chunk.byteLength) && Number.isInteger(chunk.byteOffset) && objectToString.call(chunk.buffer) === "[object ArrayBuffer]") {
        return "typedArray";
      }
      return "others";
    };
    ({ toString: objectToString } = Object.prototype);
    MaxBufferError = class extends Error {
      name = "MaxBufferError";
      constructor() {
        super("maxBuffer exceeded");
      }
    };
  }
});

// node_modules/env-ci/node_modules/get-stream/source/utils.js
var identity, noop, getContentsProp, throwObjectStream, getLengthProp;
var init_utils2 = __esm({
  "node_modules/env-ci/node_modules/get-stream/source/utils.js"() {
    identity = (value) => value;
    noop = () => void 0;
    getContentsProp = ({ contents }) => contents;
    throwObjectStream = (chunk) => {
      throw new Error(`Streams in object mode are not supported: ${String(chunk)}`);
    };
    getLengthProp = (convertedChunk) => convertedChunk.length;
  }
});

// node_modules/env-ci/node_modules/get-stream/source/array.js
var init_array = __esm({
  "node_modules/env-ci/node_modules/get-stream/source/array.js"() {
    init_contents();
    init_utils2();
  }
});

// node_modules/env-ci/node_modules/get-stream/source/array-buffer.js
async function getStreamAsArrayBuffer(stream, options) {
  return getStreamContents(stream, arrayBufferMethods, options);
}
var initArrayBuffer, useTextEncoder, textEncoder, useUint8Array, useUint8ArrayWithOffset, truncateArrayBufferChunk, addArrayBufferChunk, resizeArrayBufferSlow, resizeArrayBuffer, getNewContentsLength, SCALE_FACTOR, finalizeArrayBuffer, hasArrayBufferResize, arrayBufferMethods;
var init_array_buffer = __esm({
  "node_modules/env-ci/node_modules/get-stream/source/array-buffer.js"() {
    init_contents();
    init_utils2();
    initArrayBuffer = () => ({ contents: new ArrayBuffer(0) });
    useTextEncoder = (chunk) => textEncoder.encode(chunk);
    textEncoder = new TextEncoder();
    useUint8Array = (chunk) => new Uint8Array(chunk);
    useUint8ArrayWithOffset = (chunk) => new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
    truncateArrayBufferChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
    addArrayBufferChunk = (convertedChunk, { contents, length: previousLength }, length) => {
      const newContents = hasArrayBufferResize() ? resizeArrayBuffer(contents, length) : resizeArrayBufferSlow(contents, length);
      new Uint8Array(newContents).set(convertedChunk, previousLength);
      return newContents;
    };
    resizeArrayBufferSlow = (contents, length) => {
      if (length <= contents.byteLength) {
        return contents;
      }
      const arrayBuffer = new ArrayBuffer(getNewContentsLength(length));
      new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
      return arrayBuffer;
    };
    resizeArrayBuffer = (contents, length) => {
      if (length <= contents.maxByteLength) {
        contents.resize(length);
        return contents;
      }
      const arrayBuffer = new ArrayBuffer(length, { maxByteLength: getNewContentsLength(length) });
      new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
      return arrayBuffer;
    };
    getNewContentsLength = (length) => SCALE_FACTOR ** Math.ceil(Math.log(length) / Math.log(SCALE_FACTOR));
    SCALE_FACTOR = 2;
    finalizeArrayBuffer = ({ contents, length }) => hasArrayBufferResize() ? contents : contents.slice(0, length);
    hasArrayBufferResize = () => "resize" in ArrayBuffer.prototype;
    arrayBufferMethods = {
      init: initArrayBuffer,
      convertChunk: {
        string: useTextEncoder,
        buffer: useUint8Array,
        arrayBuffer: useUint8Array,
        dataView: useUint8ArrayWithOffset,
        typedArray: useUint8ArrayWithOffset,
        others: throwObjectStream
      },
      getSize: getLengthProp,
      truncateChunk: truncateArrayBufferChunk,
      addChunk: addArrayBufferChunk,
      getFinalChunk: noop,
      finalize: finalizeArrayBuffer
    };
  }
});

// node_modules/env-ci/node_modules/get-stream/source/buffer.js
async function getStreamAsBuffer(stream, options) {
  if (!("Buffer" in globalThis)) {
    throw new Error("getStreamAsBuffer() is only supported in Node.js");
  }
  try {
    return arrayBufferToNodeBuffer(await getStreamAsArrayBuffer(stream, options));
  } catch (error) {
    if (error.bufferedData !== void 0) {
      error.bufferedData = arrayBufferToNodeBuffer(error.bufferedData);
    }
    throw error;
  }
}
var arrayBufferToNodeBuffer;
var init_buffer = __esm({
  "node_modules/env-ci/node_modules/get-stream/source/buffer.js"() {
    init_array_buffer();
    arrayBufferToNodeBuffer = (arrayBuffer) => globalThis.Buffer.from(arrayBuffer);
  }
});

// node_modules/env-ci/node_modules/get-stream/source/string.js
async function getStreamAsString(stream, options) {
  return getStreamContents(stream, stringMethods, options);
}
var initString, useTextDecoder, addStringChunk, truncateStringChunk, getFinalStringChunk, stringMethods;
var init_string = __esm({
  "node_modules/env-ci/node_modules/get-stream/source/string.js"() {
    init_contents();
    init_utils2();
    initString = () => ({ contents: "", textDecoder: new TextDecoder() });
    useTextDecoder = (chunk, { textDecoder }) => textDecoder.decode(chunk, { stream: true });
    addStringChunk = (convertedChunk, { contents }) => contents + convertedChunk;
    truncateStringChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
    getFinalStringChunk = ({ textDecoder }) => {
      const finalChunk = textDecoder.decode();
      return finalChunk === "" ? void 0 : finalChunk;
    };
    stringMethods = {
      init: initString,
      convertChunk: {
        string: identity,
        buffer: useTextDecoder,
        arrayBuffer: useTextDecoder,
        dataView: useTextDecoder,
        typedArray: useTextDecoder,
        others: throwObjectStream
      },
      getSize: getLengthProp,
      truncateChunk: truncateStringChunk,
      addChunk: addStringChunk,
      getFinalChunk: getFinalStringChunk,
      finalize: getContentsProp
    };
  }
});

// node_modules/env-ci/node_modules/get-stream/source/index.js
var init_source = __esm({
  "node_modules/env-ci/node_modules/get-stream/source/index.js"() {
    init_array();
    init_array_buffer();
    init_buffer();
    init_string();
    init_contents();
  }
});

// node_modules/merge-stream/index.js
var require_merge_stream = __commonJS({
  "node_modules/merge-stream/index.js"(exports, module2) {
    "use strict";
    var { PassThrough } = require("stream");
    module2.exports = function() {
      var sources = [];
      var output = new PassThrough({ objectMode: true });
      output.setMaxListeners(0);
      output.add = add;
      output.isEmpty = isEmpty;
      output.on("unpipe", remove);
      Array.prototype.slice.call(arguments).forEach(add);
      return output;
      function add(source) {
        if (Array.isArray(source)) {
          source.forEach(add);
          return this;
        }
        sources.push(source);
        source.once("end", remove.bind(null, source));
        source.once("error", output.emit.bind(output, "error"));
        source.pipe(output, { end: false });
        return this;
      }
      function isEmpty() {
        return sources.length == 0;
      }
      function remove(source) {
        sources = sources.filter(function(it) {
          return it !== source;
        });
        if (!sources.length && output.readable) {
          output.end();
        }
      }
    };
  }
});

// node_modules/env-ci/node_modules/execa/lib/stream.js
var import_node_fs2, import_promises, import_merge_stream, validateInputOptions, getInputSync, handleInputSync, getInput, handleInput, makeAllStream, getBufferedData, getStreamPromise, applyEncoding, getSpawnedResult;
var init_stream = __esm({
  "node_modules/env-ci/node_modules/execa/lib/stream.js"() {
    import_node_fs2 = require("node:fs");
    import_promises = require("node:timers/promises");
    init_is_stream();
    init_source();
    import_merge_stream = __toESM(require_merge_stream(), 1);
    validateInputOptions = (input) => {
      if (input !== void 0) {
        throw new TypeError("The `input` and `inputFile` options cannot be both set.");
      }
    };
    getInputSync = ({ input, inputFile }) => {
      if (typeof inputFile !== "string") {
        return input;
      }
      validateInputOptions(input);
      return (0, import_node_fs2.readFileSync)(inputFile);
    };
    handleInputSync = (options) => {
      const input = getInputSync(options);
      if (isStream(input)) {
        throw new TypeError("The `input` option cannot be a stream in sync mode");
      }
      return input;
    };
    getInput = ({ input, inputFile }) => {
      if (typeof inputFile !== "string") {
        return input;
      }
      validateInputOptions(input);
      return (0, import_node_fs2.createReadStream)(inputFile);
    };
    handleInput = (spawned, options) => {
      const input = getInput(options);
      if (input === void 0) {
        return;
      }
      if (isStream(input)) {
        input.pipe(spawned.stdin);
      } else {
        spawned.stdin.end(input);
      }
    };
    makeAllStream = (spawned, { all }) => {
      if (!all || !spawned.stdout && !spawned.stderr) {
        return;
      }
      const mixed = (0, import_merge_stream.default)();
      if (spawned.stdout) {
        mixed.add(spawned.stdout);
      }
      if (spawned.stderr) {
        mixed.add(spawned.stderr);
      }
      return mixed;
    };
    getBufferedData = async (stream, streamPromise) => {
      if (!stream || streamPromise === void 0) {
        return;
      }
      await (0, import_promises.setTimeout)(0);
      stream.destroy();
      try {
        return await streamPromise;
      } catch (error) {
        return error.bufferedData;
      }
    };
    getStreamPromise = (stream, { encoding, buffer, maxBuffer }) => {
      if (!stream || !buffer) {
        return;
      }
      if (encoding === "utf8" || encoding === "utf-8") {
        return getStreamAsString(stream, { maxBuffer });
      }
      if (encoding === null || encoding === "buffer") {
        return getStreamAsBuffer(stream, { maxBuffer });
      }
      return applyEncoding(stream, maxBuffer, encoding);
    };
    applyEncoding = async (stream, maxBuffer, encoding) => {
      const buffer = await getStreamAsBuffer(stream, { maxBuffer });
      return buffer.toString(encoding);
    };
    getSpawnedResult = async ({ stdout, stderr, all }, { encoding, buffer, maxBuffer }, processDone) => {
      const stdoutPromise = getStreamPromise(stdout, { encoding, buffer, maxBuffer });
      const stderrPromise = getStreamPromise(stderr, { encoding, buffer, maxBuffer });
      const allPromise = getStreamPromise(all, { encoding, buffer, maxBuffer: maxBuffer * 2 });
      try {
        return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
      } catch (error) {
        return Promise.all([
          { error, signal: error.signal, timedOut: error.timedOut },
          getBufferedData(stdout, stdoutPromise),
          getBufferedData(stderr, stderrPromise),
          getBufferedData(all, allPromise)
        ]);
      }
    };
  }
});

// node_modules/env-ci/node_modules/execa/lib/promise.js
var nativePromisePrototype, descriptors, mergePromise, getSpawnedPromise;
var init_promise = __esm({
  "node_modules/env-ci/node_modules/execa/lib/promise.js"() {
    nativePromisePrototype = (async () => {
    })().constructor.prototype;
    descriptors = ["then", "catch", "finally"].map((property) => [
      property,
      Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
    ]);
    mergePromise = (spawned, promise) => {
      for (const [property, descriptor] of descriptors) {
        const value = typeof promise === "function" ? (...args) => Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
        Reflect.defineProperty(spawned, property, { ...descriptor, value });
      }
    };
    getSpawnedPromise = (spawned) => new Promise((resolve2, reject) => {
      spawned.on("exit", (exitCode, signal) => {
        resolve2({ exitCode, signal });
      });
      spawned.on("error", (error) => {
        reject(error);
      });
      if (spawned.stdin) {
        spawned.stdin.on("error", (error) => {
          reject(error);
        });
      }
    });
  }
});

// node_modules/env-ci/node_modules/execa/lib/command.js
var import_node_buffer, import_node_child_process2, normalizeArgs, NO_ESCAPE_REGEXP, escapeArg, joinCommand, getEscapedCommand, SPACES_REGEXP, parseExpression, concatTokens, parseTemplate, parseTemplates;
var init_command = __esm({
  "node_modules/env-ci/node_modules/execa/lib/command.js"() {
    import_node_buffer = require("node:buffer");
    import_node_child_process2 = require("node:child_process");
    normalizeArgs = (file, args = []) => {
      if (!Array.isArray(args)) {
        return [file];
      }
      return [file, ...args];
    };
    NO_ESCAPE_REGEXP = /^[\w.-]+$/;
    escapeArg = (arg) => {
      if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) {
        return arg;
      }
      return `"${arg.replaceAll('"', '\\"')}"`;
    };
    joinCommand = (file, args) => normalizeArgs(file, args).join(" ");
    getEscapedCommand = (file, args) => normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
    SPACES_REGEXP = / +/g;
    parseExpression = (expression) => {
      const typeOfExpression = typeof expression;
      if (typeOfExpression === "string") {
        return expression;
      }
      if (typeOfExpression === "number") {
        return String(expression);
      }
      if (typeOfExpression === "object" && expression !== null && !(expression instanceof import_node_child_process2.ChildProcess) && "stdout" in expression) {
        const typeOfStdout = typeof expression.stdout;
        if (typeOfStdout === "string") {
          return expression.stdout;
        }
        if (import_node_buffer.Buffer.isBuffer(expression.stdout)) {
          return expression.stdout.toString();
        }
        throw new TypeError(`Unexpected "${typeOfStdout}" stdout in template expression`);
      }
      throw new TypeError(`Unexpected "${typeOfExpression}" in template expression`);
    };
    concatTokens = (tokens, nextTokens, isNew) => isNew || tokens.length === 0 || nextTokens.length === 0 ? [...tokens, ...nextTokens] : [
      ...tokens.slice(0, -1),
      `${tokens.at(-1)}${nextTokens[0]}`,
      ...nextTokens.slice(1)
    ];
    parseTemplate = ({ templates, expressions, tokens, index, template }) => {
      const templateString = template ?? templates.raw[index];
      const templateTokens = templateString.split(SPACES_REGEXP).filter(Boolean);
      const newTokens = concatTokens(
        tokens,
        templateTokens,
        templateString.startsWith(" ")
      );
      if (index === expressions.length) {
        return newTokens;
      }
      const expression = expressions[index];
      const expressionTokens = Array.isArray(expression) ? expression.map((expression2) => parseExpression(expression2)) : [parseExpression(expression)];
      return concatTokens(
        newTokens,
        expressionTokens,
        templateString.endsWith(" ")
      );
    };
    parseTemplates = (templates, expressions) => {
      let tokens = [];
      for (const [index, template] of templates.entries()) {
        tokens = parseTemplate({ templates, expressions, tokens, index, template });
      }
      return tokens;
    };
  }
});

// node_modules/env-ci/node_modules/execa/lib/verbose.js
var import_node_util, import_node_process3, verboseDefault, padField, getTimestamp, logCommand;
var init_verbose = __esm({
  "node_modules/env-ci/node_modules/execa/lib/verbose.js"() {
    import_node_util = require("node:util");
    import_node_process3 = __toESM(require("node:process"), 1);
    verboseDefault = (0, import_node_util.debuglog)("execa").enabled;
    padField = (field, padding) => String(field).padStart(padding, "0");
    getTimestamp = () => {
      const date = /* @__PURE__ */ new Date();
      return `${padField(date.getHours(), 2)}:${padField(date.getMinutes(), 2)}:${padField(date.getSeconds(), 2)}.${padField(date.getMilliseconds(), 3)}`;
    };
    logCommand = (escapedCommand, { verbose }) => {
      if (!verbose) {
        return;
      }
      import_node_process3.default.stderr.write(`[${getTimestamp()}] ${escapedCommand}
`);
    };
  }
});

// node_modules/env-ci/node_modules/execa/index.js
function execa(file, args, options) {
  const parsed = handleArguments(file, args, options);
  const command = joinCommand(file, args);
  const escapedCommand = getEscapedCommand(file, args);
  logCommand(escapedCommand, parsed.options);
  validateTimeout(parsed.options);
  let spawned;
  try {
    spawned = import_node_child_process3.default.spawn(parsed.file, parsed.args, parsed.options);
  } catch (error) {
    const dummySpawned = new import_node_child_process3.default.ChildProcess();
    const errorPromise = Promise.reject(makeError({
      error,
      stdout: "",
      stderr: "",
      all: "",
      command,
      escapedCommand,
      parsed,
      timedOut: false,
      isCanceled: false,
      killed: false
    }));
    mergePromise(dummySpawned, errorPromise);
    return dummySpawned;
  }
  const spawnedPromise = getSpawnedPromise(spawned);
  const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
  const processDone = setExitHandler(spawned, parsed.options, timedPromise);
  const context = { isCanceled: false };
  spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
  spawned.cancel = spawnedCancel.bind(null, spawned, context);
  const handlePromise = async () => {
    const [{ error, exitCode, signal, timedOut }, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
    const stdout = handleOutput(parsed.options, stdoutResult);
    const stderr = handleOutput(parsed.options, stderrResult);
    const all = handleOutput(parsed.options, allResult);
    if (error || exitCode !== 0 || signal !== null) {
      const returnedError = makeError({
        error,
        exitCode,
        signal,
        stdout,
        stderr,
        all,
        command,
        escapedCommand,
        parsed,
        timedOut,
        isCanceled: context.isCanceled || (parsed.options.signal ? parsed.options.signal.aborted : false),
        killed: spawned.killed
      });
      if (!parsed.options.reject) {
        return returnedError;
      }
      throw returnedError;
    }
    return {
      command,
      escapedCommand,
      exitCode: 0,
      stdout,
      stderr,
      all,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false
    };
  };
  const handlePromiseOnce = onetime_default(handlePromise);
  handleInput(spawned, parsed.options);
  spawned.all = makeAllStream(spawned, parsed.options);
  addPipeMethods(spawned);
  mergePromise(spawned, handlePromiseOnce);
  return spawned;
}
function execaSync(file, args, options) {
  const parsed = handleArguments(file, args, options);
  const command = joinCommand(file, args);
  const escapedCommand = getEscapedCommand(file, args);
  logCommand(escapedCommand, parsed.options);
  const input = handleInputSync(parsed.options);
  let result;
  try {
    result = import_node_child_process3.default.spawnSync(parsed.file, parsed.args, { ...parsed.options, input });
  } catch (error) {
    throw makeError({
      error,
      stdout: "",
      stderr: "",
      all: "",
      command,
      escapedCommand,
      parsed,
      timedOut: false,
      isCanceled: false,
      killed: false
    });
  }
  const stdout = handleOutput(parsed.options, result.stdout, result.error);
  const stderr = handleOutput(parsed.options, result.stderr, result.error);
  if (result.error || result.status !== 0 || result.signal !== null) {
    const error = makeError({
      stdout,
      stderr,
      error: result.error,
      signal: result.signal,
      exitCode: result.status,
      command,
      escapedCommand,
      parsed,
      timedOut: result.error && result.error.code === "ETIMEDOUT",
      isCanceled: false,
      killed: result.signal !== null
    });
    if (!parsed.options.reject) {
      return error;
    }
    throw error;
  }
  return {
    command,
    escapedCommand,
    exitCode: 0,
    stdout,
    stderr,
    failed: false,
    timedOut: false,
    isCanceled: false,
    killed: false
  };
}
function create$(options) {
  function $2(templatesOrOptions, ...expressions) {
    if (!Array.isArray(templatesOrOptions)) {
      return create$({ ...options, ...templatesOrOptions });
    }
    const [file, ...args] = parseTemplates(templatesOrOptions, expressions);
    return execa(file, args, normalizeScriptOptions(options));
  }
  $2.sync = (templates, ...expressions) => {
    if (!Array.isArray(templates)) {
      throw new TypeError("Please use $(options).sync`command` instead of $.sync(options)`command`.");
    }
    const [file, ...args] = parseTemplates(templates, expressions);
    return execaSync(file, args, normalizeScriptOptions(options));
  };
  return $2;
}
var import_node_buffer2, import_node_path2, import_node_child_process3, import_node_process4, import_cross_spawn, DEFAULT_MAX_BUFFER, getEnv, handleArguments, handleOutput, normalizeScriptStdin, normalizeScriptOptions, $;
var init_execa = __esm({
  "node_modules/env-ci/node_modules/execa/index.js"() {
    import_node_buffer2 = require("node:buffer");
    import_node_path2 = __toESM(require("node:path"), 1);
    import_node_child_process3 = __toESM(require("node:child_process"), 1);
    import_node_process4 = __toESM(require("node:process"), 1);
    import_cross_spawn = __toESM(require_cross_spawn(), 1);
    init_strip_final_newline();
    init_npm_run_path();
    init_onetime();
    init_error();
    init_stdio();
    init_kill();
    init_pipe();
    init_stream();
    init_promise();
    init_command();
    init_verbose();
    DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
    getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
      const env = extendEnv ? { ...import_node_process4.default.env, ...envOption } : envOption;
      if (preferLocal) {
        return npmRunPathEnv({ env, cwd: localDir, execPath });
      }
      return env;
    };
    handleArguments = (file, args, options = {}) => {
      const parsed = import_cross_spawn.default._parse(file, args, options);
      file = parsed.command;
      args = parsed.args;
      options = parsed.options;
      options = {
        maxBuffer: DEFAULT_MAX_BUFFER,
        buffer: true,
        stripFinalNewline: true,
        extendEnv: true,
        preferLocal: false,
        localDir: options.cwd || import_node_process4.default.cwd(),
        execPath: import_node_process4.default.execPath,
        encoding: "utf8",
        reject: true,
        cleanup: true,
        all: false,
        windowsHide: true,
        verbose: verboseDefault,
        ...options
      };
      options.env = getEnv(options);
      options.stdio = normalizeStdio(options);
      if (import_node_process4.default.platform === "win32" && import_node_path2.default.basename(file, ".exe") === "cmd") {
        args.unshift("/q");
      }
      return { file, args, options, parsed };
    };
    handleOutput = (options, value, error) => {
      if (typeof value !== "string" && !import_node_buffer2.Buffer.isBuffer(value)) {
        return error === void 0 ? void 0 : "";
      }
      if (options.stripFinalNewline) {
        return stripFinalNewline(value);
      }
      return value;
    };
    normalizeScriptStdin = ({ input, inputFile, stdio }) => input === void 0 && inputFile === void 0 && stdio === void 0 ? { stdin: "inherit" } : {};
    normalizeScriptOptions = (options = {}) => ({
      preferLocal: true,
      ...normalizeScriptStdin(options),
      ...options
    });
    $ = create$();
  }
});

// node_modules/env-ci/lib/git.js
function head(options) {
  try {
    return execaSync("git", ["rev-parse", "HEAD"], options).stdout;
  } catch {
    return void 0;
  }
}
function branch(options) {
  try {
    const headRef = execaSync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      options
    ).stdout;
    if (headRef === "HEAD") {
      const branch2 = execaSync(
        "git",
        ["show", "-s", "--pretty=%d", "HEAD"],
        options
      ).stdout.replace(/^\(|\)$/g, "").split(", ").find((branch3) => branch3.startsWith("origin/"));
      return branch2 ? branch2.match(/^origin\/(?<branch>.+)/)[1] : void 0;
    }
    return headRef;
  } catch {
    return void 0;
  }
}
function getSlugFromGitURL(repositoryURL) {
  if (!repositoryURL) {
    return void 0;
  }
  if (repositoryURL.match(GIT_SSH_URL_SLUG_PATTERN)) {
    return repositoryURL.replace(GIT_SSH_URL_SLUG_PATTERN, "$1");
  }
  try {
    const url2 = new URL(repositoryURL);
    return url2.pathname.replace(GIT_PATHNAME_SLUG_PATTERN, "$1");
  } catch {
    return void 0;
  }
}
var GIT_SSH_URL_SLUG_PATTERN, GIT_PATHNAME_SLUG_PATTERN;
var init_git = __esm({
  "node_modules/env-ci/lib/git.js"() {
    init_execa();
    GIT_SSH_URL_SLUG_PATTERN = /^(?:.*)@(?:.*):(?:\d+\/)?(.*)\.git$/;
    GIT_PATHNAME_SLUG_PATTERN = /^\/(.*)\.git$/;
  }
});

// node_modules/env-ci/services/buildkite.js
var buildkite_default;
var init_buildkite = __esm({
  "node_modules/env-ci/services/buildkite.js"() {
    init_git();
    buildkite_default = {
      detect({ env }) {
        return Boolean(env.BUILDKITE);
      },
      configuration({ env }) {
        const pr = env.BUILDKITE_PULL_REQUEST === "false" ? void 0 : env.BUILDKITE_PULL_REQUEST;
        const isPr = Boolean(pr);
        return {
          name: "Buildkite",
          service: "buildkite",
          build: env.BUILDKITE_BUILD_NUMBER,
          buildUrl: env.BUILDKITE_BUILD_URL,
          commit: env.BUILDKITE_COMMIT,
          tag: env.BUILDKITE_TAG,
          branch: isPr ? env.BUILDKITE_PULL_REQUEST_BASE_BRANCH : env.BUILDKITE_BRANCH,
          slug: getSlugFromGitURL(env.BUILDKITE_REPO),
          pr,
          isPr,
          prBranch: isPr ? env.BUILDKITE_BRANCH : void 0,
          root: env.BUILDKITE_BUILD_CHECKOUT_PATH
        };
      }
    };
  }
});

// node_modules/env-ci/services/circleci.js
var circleci_default;
var init_circleci = __esm({
  "node_modules/env-ci/services/circleci.js"() {
    init_utils();
    circleci_default = {
      detect({ env }) {
        return Boolean(env.CIRCLECI);
      },
      configuration({ env }) {
        const pr = env.CIRCLE_PR_NUMBER || prNumber(env.CIRCLE_PULL_REQUEST || env.CI_PULL_REQUEST);
        const isPr = Boolean(pr);
        return {
          name: "CircleCI",
          service: "circleci",
          build: env.CIRCLE_BUILD_NUM,
          buildUrl: env.CIRCLE_BUILD_URL,
          job: `${env.CIRCLE_BUILD_NUM}.${env.CIRCLE_NODE_INDEX}`,
          commit: env.CIRCLE_SHA1,
          tag: env.CIRCLE_TAG,
          branch: isPr ? void 0 : env.CIRCLE_BRANCH,
          pr,
          isPr,
          prBranch: isPr ? env.CIRCLE_BRANCH : void 0,
          slug: `${env.CIRCLE_PROJECT_USERNAME}/${env.CIRCLE_PROJECT_REPONAME}`
        };
      }
    };
  }
});

// node_modules/env-ci/services/cirrus.js
var CIRRUS_CI_DASHBOARD, cirrus_default;
var init_cirrus = __esm({
  "node_modules/env-ci/services/cirrus.js"() {
    CIRRUS_CI_DASHBOARD = "https://cirrus-ci.com";
    cirrus_default = {
      detect({ env }) {
        return Boolean(env.CIRRUS_CI);
      },
      configuration({ env }) {
        const pr = env.CIRRUS_PR;
        const isPr = Boolean(pr);
        return {
          name: "Cirrus CI",
          service: "cirrus",
          commit: env.CIRRUS_CHANGE_IN_REPO,
          tag: env.CIRRUS_TAG,
          build: env.CIRRUS_BUILD_ID,
          buildUrl: `${CIRRUS_CI_DASHBOARD}/build/${env.CIRRUS_BUILD_ID}`,
          job: env.CIRRUS_TASK_ID,
          jobUrl: `${CIRRUS_CI_DASHBOARD}/task/${env.CIRRUS_TASK_ID}`,
          branch: isPr ? env.CIRRUS_BASE_BRANCH : env.CIRRUS_BRANCH,
          pr,
          isPr,
          prBranch: isPr ? env.CIRRUS_BRANCH : void 0,
          slug: env.CIRRUS_REPO_FULL_NAME,
          root: env.CIRRUS_WORKING_DIR
        };
      }
    };
  }
});

// node_modules/env-ci/services/cloudflare-pages.js
var cloudflare_pages_default;
var init_cloudflare_pages = __esm({
  "node_modules/env-ci/services/cloudflare-pages.js"() {
    cloudflare_pages_default = {
      detect({ env }) {
        return env.CF_PAGES === "1";
      },
      configuration({ env }) {
        return {
          name: "Cloudflare Pages",
          service: "cloudflarePages",
          commit: env.CF_PAGES_COMMIT_SHA,
          branch: env.CF_PAGES_BRANCH,
          root: env.PWD
        };
      }
    };
  }
});

// node_modules/env-ci/services/codebuild.js
var codebuild_default;
var init_codebuild = __esm({
  "node_modules/env-ci/services/codebuild.js"() {
    init_git();
    codebuild_default = {
      detect({ env }) {
        return Boolean(env.CODEBUILD_BUILD_ID);
      },
      configuration({ env, cwd }) {
        return {
          name: "AWS CodeBuild",
          service: "codebuild",
          commit: head({ env, cwd }),
          build: env.CODEBUILD_BUILD_ID,
          branch: branch({ env, cwd }),
          buildUrl: `https://console.aws.amazon.com/codebuild/home?region=${env.AWS_REGION}#/builds/${env.CODEBUILD_BUILD_ID}/view/new`,
          root: env.PWD
        };
      }
    };
  }
});

// node_modules/env-ci/services/codefresh.js
var codefresh_default;
var init_codefresh = __esm({
  "node_modules/env-ci/services/codefresh.js"() {
    codefresh_default = {
      detect({ env }) {
        return Boolean(env.CF_BUILD_ID);
      },
      configuration({ env }) {
        const pr = env.CF_PULL_REQUEST_NUMBER;
        const isPr = Boolean(pr);
        return {
          name: "Codefresh",
          service: "codefresh",
          commit: env.CF_REVISION,
          build: env.CF_BUILD_ID,
          buildUrl: env.CF_BUILD_URL,
          branch: isPr ? env.CF_PULL_REQUEST_TARGET : env.CF_BRANCH,
          pr,
          isPr,
          prBranch: isPr ? env.CF_BRANCH : void 0,
          slug: `${env.CF_REPO_OWNER}/${env.CF_REPO_NAME}`,
          root: env.CF_VOLUME_PATH
        };
      }
    };
  }
});

// node_modules/env-ci/services/codeship.js
var codeship_default;
var init_codeship = __esm({
  "node_modules/env-ci/services/codeship.js"() {
    codeship_default = {
      detect({ env }) {
        return env.CI_NAME && env.CI_NAME === "codeship";
      },
      configuration({ env }) {
        return {
          name: "Codeship",
          service: "codeship",
          build: env.CI_BUILD_NUMBER,
          buildUrl: env.CI_BUILD_URL,
          commit: env.CI_COMMIT_ID,
          branch: env.CI_BRANCH,
          slug: env.CI_REPO_NAME
        };
      }
    };
  }
});

// node_modules/env-ci/services/drone.js
var drone_default;
var init_drone = __esm({
  "node_modules/env-ci/services/drone.js"() {
    drone_default = {
      detect({ env }) {
        return Boolean(env.DRONE);
      },
      configuration({ env }) {
        const isPr = env.DRONE_BUILD_EVENT === "pull_request";
        return {
          name: "Drone",
          service: "drone",
          commit: env.DRONE_COMMIT_SHA,
          tag: env.DRONE_TAG,
          build: env.DRONE_BUILD_NUMBER,
          buildUrl: env.DRONE_BUILD_LINK,
          branch: isPr ? env.DRONE_TARGET_BRANCH : env.DRONE_BRANCH,
          job: env.DRONE_JOB_NUMBER,
          jobUrl: env.DRONE_BUILD_LINK,
          pr: env.DRONE_PULL_REQUEST,
          isPr,
          prBranch: isPr ? env.DRONE_SOURCE_BRANCH : void 0,
          slug: `${env.DRONE_REPO_OWNER}/${env.DRONE_REPO_NAME}`,
          root: env.DRONE_WORKSPACE
        };
      }
    };
  }
});

// node_modules/env-ci/services/git.js
var git_default;
var init_git2 = __esm({
  "node_modules/env-ci/services/git.js"() {
    init_git();
    git_default = {
      configuration(options) {
        return { commit: head(options), branch: branch(options) };
      }
    };
  }
});

// node_modules/env-ci/services/github.js
var import_node_fs3, getPrEvent, getPrNumber, github_default;
var init_github = __esm({
  "node_modules/env-ci/services/github.js"() {
    import_node_fs3 = require("node:fs");
    init_utils();
    getPrEvent = ({ env }) => {
      try {
        const event = env.GITHUB_EVENT_PATH ? JSON.parse((0, import_node_fs3.readFileSync)(env.GITHUB_EVENT_PATH, "utf-8")) : void 0;
        if (event && event.pull_request) {
          return {
            branch: event.pull_request.base ? parseBranch(event.pull_request.base.ref) : void 0,
            pr: event.pull_request.number
          };
        }
      } catch {
      }
      return { pr: void 0, branch: void 0 };
    };
    getPrNumber = (env) => {
      const event = env.GITHUB_EVENT_PATH ? JSON.parse((0, import_node_fs3.readFileSync)(env.GITHUB_EVENT_PATH, "utf-8")) : void 0;
      return event && event.pull_request ? event.pull_request.number : void 0;
    };
    github_default = {
      detect({ env }) {
        return Boolean(env.GITHUB_ACTIONS);
      },
      configuration({ env, cwd }) {
        const isPr = env.GITHUB_EVENT_NAME === "pull_request" || env.GITHUB_EVENT_NAME === "pull_request_target";
        const branch2 = parseBranch(
          env.GITHUB_EVENT_NAME === "pull_request_target" ? `refs/pull/${getPrNumber(env)}/merge` : env.GITHUB_REF
        );
        return {
          name: "GitHub Actions",
          service: "github",
          commit: env.GITHUB_SHA,
          build: env.GITHUB_RUN_ID,
          buildUrl: `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`,
          isPr,
          branch: branch2,
          prBranch: isPr ? branch2 : void 0,
          slug: env.GITHUB_REPOSITORY,
          root: env.GITHUB_WORKSPACE,
          ...isPr ? getPrEvent({ env, cwd }) : void 0
        };
      }
    };
  }
});

// node_modules/env-ci/services/gitlab.js
var gitlab_default;
var init_gitlab = __esm({
  "node_modules/env-ci/services/gitlab.js"() {
    gitlab_default = {
      detect({ env }) {
        return Boolean(env.GITLAB_CI);
      },
      configuration({ env }) {
        const pr = env.CI_MERGE_REQUEST_ID;
        const isPr = Boolean(pr);
        return {
          name: "GitLab CI/CD",
          service: "gitlab",
          commit: env.CI_COMMIT_SHA,
          tag: env.CI_COMMIT_TAG,
          build: env.CI_PIPELINE_ID,
          buildUrl: `${env.CI_PROJECT_URL}/pipelines/${env.CI_PIPELINE_ID}`,
          job: env.CI_JOB_ID,
          jobUrl: `${env.CI_PROJECT_URL}/-/jobs/${env.CI_JOB_ID}`,
          branch: isPr ? env.CI_MERGE_REQUEST_TARGET_BRANCH_NAME : env.CI_COMMIT_REF_NAME,
          pr,
          isPr,
          prBranch: env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME,
          slug: env.CI_PROJECT_PATH,
          root: env.CI_PROJECT_DIR
        };
      }
    };
  }
});

// node_modules/env-ci/services/jenkins.js
var jenkins_default;
var init_jenkins = __esm({
  "node_modules/env-ci/services/jenkins.js"() {
    init_git();
    jenkins_default = {
      detect({ env }) {
        return Boolean(env.JENKINS_URL);
      },
      configuration({ env, cwd }) {
        const pr = env.ghprbPullId || env.gitlabMergeRequestId || env.CHANGE_ID;
        const isPr = Boolean(pr);
        const localBranch = env.GIT_LOCAL_BRANCH || env.GIT_BRANCH || env.gitlabBranch || env.BRANCH_NAME;
        return {
          name: "Jenkins",
          service: "jenkins",
          commit: env.ghprbActualCommit || env.GIT_COMMIT || head({ env, cwd }),
          branch: isPr ? env.ghprbTargetBranch || env.gitlabTargetBranch : localBranch,
          build: env.BUILD_NUMBER,
          buildUrl: env.BUILD_URL,
          root: env.WORKSPACE,
          pr,
          isPr,
          prBranch: isPr ? env.ghprbSourceBranch || env.gitlabSourceBranch || localBranch : void 0
        };
      }
    };
  }
});

// node_modules/env-ci/services/netlify.js
var netlify_default;
var init_netlify = __esm({
  "node_modules/env-ci/services/netlify.js"() {
    netlify_default = {
      detect({ env }) {
        return env.NETLIFY === "true";
      },
      configuration({ env }) {
        const isPr = env.PULL_REQUEST === "true";
        return {
          name: "Netlify",
          service: "netlify",
          commit: env.COMMIT_REF,
          build: env.DEPLOY_ID,
          buildUrl: `https://app.netlify.com/sites/${env.SITE_NAME}/deploys/${env.DEPLOY_ID}`,
          branch: isPr ? void 0 : env.HEAD,
          pr: env.REVIEW_ID,
          isPr,
          prBranch: isPr ? env.HEAD : void 0,
          slug: env.REPOSITORY_URL.match(/[^/:]+\/[^/]+?$/)[0],
          root: env.PWD
        };
      }
    };
  }
});

// node_modules/env-ci/services/puppet.js
var puppet_default;
var init_puppet = __esm({
  "node_modules/env-ci/services/puppet.js"() {
    puppet_default = {
      detect({ env }) {
        return Boolean(env.DISTELLI_APPNAME);
      },
      configuration({ env }) {
        return {
          name: "Puppet",
          service: "puppet",
          build: env.DISTELLI_BUILDNUM,
          buildUrl: env.DISTELLI_RELEASE,
          commit: env.DISTELLI_RELREVISION,
          branch: env.DISTELLI_RELBRANCH,
          root: env.DISTELLI_INSTALLHOME
        };
      }
    };
  }
});

// node_modules/env-ci/services/sail.js
var sail_default;
var init_sail = __esm({
  "node_modules/env-ci/services/sail.js"() {
    sail_default = {
      detect({ env }) {
        return Boolean(env.SAILCI);
      },
      configuration({ env }) {
        const pr = env.SAIL_PULL_REQUEST_NUMBER;
        const isPr = Boolean(pr);
        return {
          name: "Sail CI",
          service: "sail",
          commit: env.SAIL_COMMIT_SHA,
          branch: isPr ? void 0 : env.SAIL_COMMIT_BRANCH,
          pr,
          isPr,
          slug: `${env.SAIL_REPO_OWNER}/${env.SAIL_REPO_NAME}`,
          root: env.SAIL_CLONE_DIR
        };
      }
    };
  }
});

// node_modules/env-ci/services/screwdriver.js
var screwdriver_default;
var init_screwdriver = __esm({
  "node_modules/env-ci/services/screwdriver.js"() {
    screwdriver_default = {
      detect({ env }) {
        return Boolean(env.SCREWDRIVER);
      },
      configuration({ env }) {
        const pr = env.SD_PULL_REQUEST;
        const isPr = Boolean(pr);
        return {
          name: "Screwdriver.cd",
          service: "screwdriver",
          branch: isPr ? env.PR_BASE_BRANCH_NAME : env.GIT_BRANCH,
          prBranch: isPr ? env.PR_BRANCH_NAME : void 0,
          commit: env.SD_BUILD_SHA,
          build: env.SD_BUILD_ID,
          buildUrl: env.SD_UI_BUILD_URL,
          job: env.SD_JOB_ID,
          pr,
          isPr,
          slug: env.SD_PIPELINE_NAME,
          root: env.SD_ROOT_DIR
        };
      }
    };
  }
});

// node_modules/env-ci/services/scrutinizer.js
var scrutinizer_default;
var init_scrutinizer = __esm({
  "node_modules/env-ci/services/scrutinizer.js"() {
    scrutinizer_default = {
      detect({ env }) {
        return Boolean(env.SCRUTINIZER);
      },
      configuration({ env }) {
        const pr = env.SCRUTINIZER_PR_NUMBER;
        const isPr = Boolean(pr);
        return {
          name: "Scrutinizer",
          service: "scrutinizer",
          commit: env.SCRUTINIZER_SHA1,
          build: env.SCRUTINIZER_INSPECTION_UUID,
          branch: env.SCRUTINIZER_BRANCH,
          pr,
          isPr,
          prBranch: env.SCRUTINIZER_PR_SOURCE_BRANCH
        };
      }
    };
  }
});

// node_modules/env-ci/services/semaphore.js
var semaphore_default;
var init_semaphore = __esm({
  "node_modules/env-ci/services/semaphore.js"() {
    init_git();
    semaphore_default = {
      detect({ env }) {
        return Boolean(env.SEMAPHORE);
      },
      configuration({ env, cwd }) {
        const pr = env.SEMAPHORE_GIT_PR_NUMBER || env.PULL_REQUEST_NUMBER;
        const isPr = Boolean(pr);
        return {
          name: "Semaphore",
          service: "semaphore",
          commit: env.SEMAPHORE_GIT_SHA || head({ env, cwd }),
          tag: env.SEMAPHORE_GIT_TAG_NAME,
          build: env.SEMAPHORE_JOB_ID || env.SEMAPHORE_BUILD_NUMBER,
          branch: env.SEMAPHORE_GIT_BRANCH || (isPr ? void 0 : env.BRANCH_NAME),
          pr,
          isPr,
          prBranch: env.SEMAPHORE_GIT_PR_BRANCH || (isPr ? env.BRANCH_NAME : void 0),
          slug: env.SEMAPHORE_GIT_REPO_SLUG || env.SEMAPHORE_REPO_SLUG,
          root: env.SEMAPHORE_GIT_DIR || env.SEMAPHORE_PROJECT_DIR
        };
      }
    };
  }
});

// node_modules/env-ci/services/shippable.js
var shippable_default;
var init_shippable = __esm({
  "node_modules/env-ci/services/shippable.js"() {
    shippable_default = {
      detect({ env }) {
        return Boolean(env.SHIPPABLE);
      },
      configuration({ env }) {
        const pr = env.IS_PULL_REQUEST === "true" ? env.PULL_REQUEST : void 0;
        const isPr = Boolean(pr);
        return {
          name: "Shippable",
          service: "shippable",
          commit: env.COMMIT,
          tag: env.GIT_TAG_NAME,
          build: env.BUILD_NUMBER,
          buildUrl: env.BUILD_URL,
          branch: isPr ? env.BASE_BRANCH : env.BRANCH,
          job: env.JOB_NUMBER,
          pr,
          isPr,
          prBranch: isPr ? env.HEAD_BRANCH : void 0,
          slug: env.SHIPPABLE_REPO_SLUG,
          root: env.SHIPPABLE_BUILD_DIR
        };
      }
    };
  }
});

// node_modules/java-properties/dist-node/index.js
var require_dist_node = __commonJS({
  "node_modules/java-properties/dist-node/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.of = exports.PropertiesFile = void 0;
    var _fs = _interopRequireDefault(require("fs"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var PropertiesFile = class {
      constructor(...args) {
        this.objs = {};
        if (args.length) {
          this.of.apply(this, args);
        }
      }
      makeKeys(line) {
        if (line && line.indexOf("#") !== 0) {
          let separatorPositions = ["=", ":"].map((sep) => {
            return line.indexOf(sep);
          }).filter((index) => {
            return index > -1;
          });
          let splitIndex = Math.min(...separatorPositions);
          let key = line.substring(0, splitIndex).trim();
          let value = line.substring(splitIndex + 1).trim();
          if (this.objs.hasOwnProperty(key)) {
            if (Array.isArray(this.objs[key])) {
              this.objs[key].push(value);
            } else {
              let oldValue = this.objs[key];
              this.objs[key] = [oldValue, value];
            }
          } else {
            const escapedValue = value.replace(/"/g, '\\"').replace(/\\:/g, ":").replace(/\\=/g, "=");
            this.objs[key] = unescape(JSON.parse('"' + escapedValue + '"'));
          }
        }
      }
      addFile(file) {
        let data = _fs.default.readFileSync(file, "utf-8");
        let items = data.split(/\r?\n/);
        let me = this;
        for (let i = 0; i < items.length; i++) {
          let line = items[i];
          while (line.substring(line.length - 1) === "\\") {
            line = line.slice(0, -1);
            let nextLine = items[i + 1];
            line = line + nextLine.trim();
            i++;
          }
          me.makeKeys(line);
        }
      }
      of(...args) {
        for (let i = 0; i < args.length; i++) {
          this.addFile(args[i]);
        }
      }
      get(key, defaultValue) {
        if (this.objs.hasOwnProperty(key)) {
          if (Array.isArray(this.objs[key])) {
            let ret = [];
            for (let i = 0; i < this.objs[key].length; i++) {
              ret[i] = this.interpolate(this.objs[key][i]);
            }
            return ret;
          } else {
            return typeof this.objs[key] === "undefined" ? "" : this.interpolate(this.objs[key]);
          }
        }
        return defaultValue;
      }
      getLast(key, defaultValue) {
        if (this.objs.hasOwnProperty(key)) {
          if (Array.isArray(this.objs[key])) {
            var lg = this.objs[key].length;
            return this.interpolate(this.objs[key][lg - 1]);
          } else {
            return typeof this.objs[key] === "undefined" ? "" : this.interpolate(this.objs[key]);
          }
        }
        return defaultValue;
      }
      getFirst(key, defaultValue) {
        if (this.objs.hasOwnProperty(key)) {
          if (Array.isArray(this.objs[key])) {
            return this.interpolate(this.objs[key][0]);
          } else {
            return typeof this.objs[key] === "undefined" ? "" : this.interpolate(this.objs[key]);
          }
        }
        return defaultValue;
      }
      getInt(key, defaultIntValue) {
        let val = this.getLast(key);
        if (!val) {
          return defaultIntValue;
        } else {
          return parseInt(val, 10);
        }
      }
      getFloat(key, defaultFloatValue) {
        let val = this.getLast(key);
        if (!val) {
          return defaultFloatValue;
        } else {
          return parseFloat(val);
        }
      }
      getBoolean(key, defaultBooleanValue) {
        function parseBool(b) {
          return !/^(false|0)$/i.test(b) && !!b;
        }
        let val = this.getLast(key);
        if (!val) {
          return defaultBooleanValue || false;
        } else {
          return parseBool(val);
        }
      }
      set(key, value) {
        this.objs[key] = value;
      }
      interpolate(s) {
        let me = this;
        return s.replace(/\\\\/g, "\\").replace(/\$\{([A-Za-z0-9\.\-\_]*)\}/g, function(match) {
          return me.getLast(match.substring(2, match.length - 1));
        });
      }
      getKeys() {
        let keys = [];
        for (let key in this.objs) {
          keys.push(key);
        }
        return keys;
      }
      getMatchingKeys(matchstr) {
        let keys = [];
        for (let key in this.objs) {
          if (key.search(matchstr) !== -1) {
            keys.push(key);
          }
        }
        return keys;
      }
      reset() {
        this.objs = {};
      }
    };
    exports.PropertiesFile = PropertiesFile;
    var of = function of2(...args) {
      let globalFile = new PropertiesFile();
      globalFile.of.apply(globalFile, args);
      return globalFile;
    };
    exports.of = of;
  }
});

// node_modules/env-ci/services/teamcity.js
var import_java_properties, PROPERTIES_MAPPING, safeReadProperties, getProperties, teamcity_default;
var init_teamcity = __esm({
  "node_modules/env-ci/services/teamcity.js"() {
    import_java_properties = __toESM(require_dist_node(), 1);
    init_git();
    PROPERTIES_MAPPING = {
      root: "teamcity.build.workingDir",
      branch: "teamcity.build.branch"
    };
    safeReadProperties = (filePath) => {
      try {
        return import_java_properties.default.of(filePath);
      } catch {
        return void 0;
      }
    };
    getProperties = ({ env, cwd }) => {
      const buildProperties = env.TEAMCITY_BUILD_PROPERTIES_FILE ? safeReadProperties(env.TEAMCITY_BUILD_PROPERTIES_FILE) : void 0;
      const configFile = buildProperties ? buildProperties.get("teamcity.configuration.properties.file") : void 0;
      const configProperties = configFile ? safeReadProperties(configFile) : configFile;
      return Object.fromEntries(
        Object.keys(PROPERTIES_MAPPING).map((key) => [
          key,
          (buildProperties ? buildProperties.get(PROPERTIES_MAPPING[key]) : void 0) || (configProperties ? configProperties.get(PROPERTIES_MAPPING[key]) : void 0) || (key === "branch" ? branch({ env, cwd }) : void 0)
        ])
      );
    };
    teamcity_default = {
      detect({ env }) {
        return Boolean(env.TEAMCITY_VERSION);
      },
      configuration({ env, cwd }) {
        return {
          name: "TeamCity",
          service: "teamcity",
          commit: env.BUILD_VCS_NUMBER,
          build: env.BUILD_NUMBER,
          slug: env.TEAMCITY_BUILDCONF_NAME,
          ...getProperties({ env, cwd })
        };
      }
    };
  }
});

// node_modules/env-ci/services/travis.js
var travis_default;
var init_travis = __esm({
  "node_modules/env-ci/services/travis.js"() {
    travis_default = {
      detect({ env }) {
        return Boolean(env.TRAVIS);
      },
      configuration({ env }) {
        const pr = env.TRAVIS_PULL_REQUEST === "false" ? void 0 : env.TRAVIS_PULL_REQUEST;
        const isPr = Boolean(pr);
        return {
          name: "Travis CI",
          service: "travis",
          commit: env.TRAVIS_COMMIT,
          tag: env.TRAVIS_TAG,
          build: env.TRAVIS_BUILD_NUMBER,
          buildUrl: env.TRAVIS_BUILD_WEB_URL,
          branch: env.TRAVIS_BRANCH,
          job: env.TRAVIS_JOB_NUMBER,
          jobUrl: env.TRAVIS_JOB_WEB_URL,
          pr,
          isPr,
          prBranch: env.TRAVIS_PULL_REQUEST_BRANCH,
          slug: env.TRAVIS_REPO_SLUG,
          root: env.TRAVIS_BUILD_DIR
        };
      }
    };
  }
});

// node_modules/env-ci/services/vela.js
var vela_default;
var init_vela = __esm({
  "node_modules/env-ci/services/vela.js"() {
    vela_default = {
      detect({ env }) {
        return Boolean(env.VELA);
      },
      configuration({ env }) {
        const isPr = env.VELA_BUILD_EVENT === "pull_request";
        return {
          name: "Vela",
          service: "vela",
          branch: isPr ? env.VELA_PULL_REQUEST_TARGET : env.VELA_BUILD_BRANCH,
          commit: env.VELA_BUILD_COMMIT,
          tag: env.VELA_BUILD_TAG,
          build: env.VELA_BUILD_NUMBER,
          buildUrl: env.VELA_BUILD_LINK,
          job: void 0,
          jobUrl: void 0,
          isPr,
          pr: env.VELA_BUILD_PULL_REQUEST,
          prBranch: env.VELA_PULL_REQUEST_SOURCE,
          slug: env.VELA_REPO_FULL_NAME,
          root: env.VELA_BUILD_WORKSPACE
        };
      }
    };
  }
});

// node_modules/env-ci/services/vercel.js
var vercel_default;
var init_vercel = __esm({
  "node_modules/env-ci/services/vercel.js"() {
    vercel_default = {
      detect({ env }) {
        return Boolean(env.VERCEL) || Boolean(env.NOW_GITHUB_DEPLOYMENT);
      },
      configuration({ env }) {
        const name = "Vercel";
        const service = "vercel";
        if (env.VERCEL) {
          return {
            name,
            service,
            commit: env.VERCEL_GIT_COMMIT_SHA,
            branch: env.VERCEL_GIT_COMMIT_REF,
            slug: `${env.VERCEL_GIT_REPO_OWNER}/${env.VERCEL_GIT_REPO_SLUG}`
          };
        }
        return {
          name,
          service,
          commit: env.NOW_GITHUB_COMMIT_SHA,
          branch: env.NOW_GITHUB_COMMIT_REF,
          slug: `${env.NOW_GITHUB_ORG}/${env.NOW_GITHUB_REPO}`
        };
      }
    };
  }
});

// node_modules/env-ci/services/wercker.js
var wercker_default;
var init_wercker = __esm({
  "node_modules/env-ci/services/wercker.js"() {
    wercker_default = {
      detect({ env }) {
        return Boolean(env.WERCKER_MAIN_PIPELINE_STARTED);
      },
      configuration({ env }) {
        return {
          name: "Wercker",
          service: "wercker",
          commit: env.WERCKER_GIT_COMMIT,
          build: env.WERCKER_MAIN_PIPELINE_STARTED,
          buildUrl: env.WERCKER_RUN_URL,
          branch: env.WERCKER_GIT_BRANCH,
          slug: `${env.WERCKER_GIT_OWNER}/${env.WERCKER_GIT_REPOSITORY}`,
          root: env.WERCKER_ROOT
        };
      }
    };
  }
});

// node_modules/env-ci/services/woodpecker.js
var woodpecker_default;
var init_woodpecker = __esm({
  "node_modules/env-ci/services/woodpecker.js"() {
    woodpecker_default = {
      detect({ env }) {
        return env.CI && env.CI === "woodpecker";
      },
      configuration({ env }) {
        const isPr = env.CI_PIPELINE_EVENT === "pull_request";
        return {
          name: "Woodpecker CI",
          service: "woodpecker",
          commit: env.CI_COMMIT_SHA,
          tag: env.CI_COMMIT_TAG,
          build: env.CI_PIPELINE_NUMBER,
          buildUrl: env.CI_PIPELINE_URL,
          branch: isPr ? env.CI_COMMIT_TARGET_BRANCH : env.CI_COMMIT_BRANCH,
          job: env.CI_STEP_NUMBER,
          jobUrl: env.CI_STEP_URL,
          pr: env.CI_COMMIT_PULL_REQUEST,
          isPr,
          prBranch: isPr ? env.CI_COMMIT_SOURCE_BRANCH : void 0,
          slug: `${env.CI_REPO_OWNER}/${env.CI_REPO_NAME}`,
          root: env.CI_WORKSPACE
        };
      }
    };
  }
});

// node_modules/env-ci/services/jetbrains-space.js
var jetbrains_space_default;
var init_jetbrains_space = __esm({
  "node_modules/env-ci/services/jetbrains-space.js"() {
    init_utils();
    jetbrains_space_default = {
      detect({ env }) {
        return Boolean(env.JB_SPACE_EXECUTION_NUMBER);
      },
      configuration({ env }) {
        const projectKey = env.JB_SPACE_PROJECT_KEY;
        const repositoryName = env.JB_SPACE_GIT_REPOSITORY_NAME;
        return {
          name: "JetBrains Space",
          service: "jetbrainsSpace",
          commit: env.JB_SPACE_GIT_REVISION,
          build: env.JB_SPACE_EXECUTION_NUMBER,
          branch: parseBranch(env.JB_SPACE_GIT_BRANCH),
          slug: projectKey && repositoryName ? `${projectKey.toLowerCase()}/${repositoryName}` : void 0
        };
      }
    };
  }
});

// node_modules/env-ci/index.js
var env_ci_exports = {};
__export(env_ci_exports, {
  default: () => env_ci_default
});
var services, env_ci_default;
var init_env_ci = __esm({
  "node_modules/env-ci/index.js"() {
    init_appveyor();
    init_azure_pipelines();
    init_bamboo();
    init_bitbucket();
    init_bitrise();
    init_buddy();
    init_buildkite();
    init_circleci();
    init_cirrus();
    init_cloudflare_pages();
    init_codebuild();
    init_codefresh();
    init_codeship();
    init_drone();
    init_git2();
    init_github();
    init_gitlab();
    init_jenkins();
    init_netlify();
    init_puppet();
    init_sail();
    init_screwdriver();
    init_scrutinizer();
    init_semaphore();
    init_shippable();
    init_teamcity();
    init_travis();
    init_vela();
    init_vercel();
    init_wercker();
    init_woodpecker();
    init_jetbrains_space();
    services = {
      appveyor: appveyor_default,
      azurePipelines: azure_pipelines_default,
      bamboo: bamboo_default,
      bitbucket: bitbucket_default,
      bitrise: bitrise_default,
      buddy: buddy_default,
      buildkite: buildkite_default,
      circleci: circleci_default,
      cirrus: cirrus_default,
      cloudflarePages: cloudflare_pages_default,
      codebuild: codebuild_default,
      codefresh: codefresh_default,
      codeship: codeship_default,
      drone: drone_default,
      github: github_default,
      gitlab: gitlab_default,
      jenkins: jenkins_default,
      netlify: netlify_default,
      puppet: puppet_default,
      sail: sail_default,
      screwdriver: screwdriver_default,
      scrutinizer: scrutinizer_default,
      semaphore: semaphore_default,
      shippable: shippable_default,
      teamcity: teamcity_default,
      travis: travis_default,
      vela: vela_default,
      vercel: vercel_default,
      wercker: wercker_default,
      woodpecker: woodpecker_default,
      jetbrainsSpace: jetbrains_space_default
    };
    env_ci_default = ({ env = process.env, cwd = process.cwd() } = {}) => {
      for (const name of Object.keys(services)) {
        if (services[name].detect({ env, cwd })) {
          return { isCi: true, ...services[name].configuration({ env, cwd }) };
        }
      }
      return { isCi: Boolean(env.CI), ...git_default.configuration({ env, cwd }) };
    };
  }
});

// src/index.ts
var core2 = __toESM(require_core(), 1);

// src/defaultConfig.ts
var plugins = [
  "@semantic-release/commit-analyzer",
  "@semantic-release/release-notes-generator"
];
if (process.env.NPM_TOKEN) {
  plugins.push("@semantic-release/npm");
}
if (process.env.GITHUB_TOKEN) {
  plugins.push("@semantic-release/github");
}
var defaultConfig_default = {
  plugins,
  preset: "conventionalcommits",
  // See defaults: https://github.com/semantic-release/semantic-release/blob/master/lib/get-config.js#L57-L64
  // See issue: https://github.com/semantic-release/semantic-release/issues/1581
  // Moving ahead and adding `main` to the defaults
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    "master",
    "next",
    "next-major",
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true }
  ]
};

// src/util/spawn.ts
var core = __toESM(require_core(), 1);
var child_process = __toESM(require("child_process"), 1);
function spawn2(cmd, args = [], options = {}) {
  return new Promise((res, rej) => {
    const child = child_process.spawn(cmd, args, options);
    let output = "";
    const buffer = { out: "", err: "" };
    function addBuffered(type, data) {
      if (type === "out") {
        output += data;
      }
      buffer[type] += data;
      sendBuffered(type);
    }
    function sendBuffered(type, force = false) {
      const nPos = buffer[type].lastIndexOf("\n");
      if (!force && nPos < 0 || !buffer[type]) {
        return;
      }
      const slice = force ? buffer[type] : buffer[type].slice(0, nPos + 1);
      const lines = slice.split("\n");
      if (lines.some((ln) => ln.trim())) {
        const logger = type === "out" ? core.debug : core.warning;
        if (lines[lines.length - 1].trim() === "") {
          lines.pop();
        }
        lines.forEach((ln) => logger(ln));
        buffer[type] = buffer[type].slice(slice.length);
      }
    }
    child.on("error", (code, signal) => {
      rej(`Failed to spawn "${cmd}": ${signal ?? code}`);
    });
    child.on("exit", (code, signal) => {
      sendBuffered("out", true);
      sendBuffered("err", true);
      if (code === 0) {
        res(output);
      } else {
        rej(`${cmd} ${JSON.stringify(args)} failed: ${signal ?? code}`);
      }
    });
    child.stdout?.on("data", (data) => addBuffered("out", data));
    child.stderr?.on("data", (data) => addBuffered("err", data));
  });
}

// src/util/resolve.ts
var resolve = require.resolve;

// src/util/install.ts
function install(packages, log, debug3 = true) {
  const missing = packages.filter((resolvableName) => {
    try {
      const module2 = resolve(resolvableName);
      log(`"${resolvableName}" resolved to "${module2}"`);
      return false;
    } catch (e) {
      return true;
    }
  });
  if (missing.length) {
    log(`Install ${JSON.stringify(missing)}`);
    const args = ["install", "--no-save"];
    if (!debug3) {
      args.push("--silent");
    }
    args.push("--", ...missing);
    return spawn2("npm", args, {
      cwd: __dirname
    });
  }
  return Promise.resolve("");
}

// src/plugin/forceRelease.ts
var forceRelease_exports = {};
__export(forceRelease_exports, {
  analyzeCommits: () => analyzeCommits
});

// src/plugin/shared/releaseTypes.ts
var releaseTypes = /* @__PURE__ */ ((releaseTypes2) => {
  releaseTypes2["major"] = "major";
  releaseTypes2["premajor"] = "premajor";
  releaseTypes2["minor"] = "minor";
  releaseTypes2["preminor"] = "preminor";
  releaseTypes2["patch"] = "patch";
  releaseTypes2["prepatch"] = "prepatch";
  releaseTypes2["prerelease"] = "prerelease";
  return releaseTypes2;
})(releaseTypes || {});
function getReleaseType(k) {
  return Object.keys(releaseTypes).includes(k) ? releaseTypes[k] : void 0;
}

// src/plugin/forceRelease.ts
async function analyzeCommits(config, context) {
  if (!context.env.RELEASE_FORCE) {
    return null;
  }
  const type = getReleaseType(context.env.RELEASE_FORCE) ?? "patch" /* patch */;
  context.logger.log("Force release: %s", type);
  return type;
}

// src/plugin/initialRelease.ts
var initialRelease_exports = {};
__export(initialRelease_exports, {
  analyzeCommits: () => analyzeCommits2
});
async function analyzeCommits2(config, context) {
  if (!context.lastRelease?.gitHead) {
    context.logger.log("Initial release");
    return "patch" /* patch */;
  }
  return null;
}

// src/util/updateTags.ts
async function updateTags(ref, versionString, version2, tagPrefix = "") {
  const tags = [];
  if (!version2.revision) {
    const minorTag = `${tagPrefix}${version2.major}.${version2.minor}`;
    tags.push(minorTag);
    const nextMinor = `${tagPrefix}${version2.major}.${Number(version2.minor) + 1}.0`;
    const hasNextMinor = await spawn2("git", ["ls-remote", "origin", `refs/tags/${nextMinor}`]);
    if (!hasNextMinor) {
      const majorTag = `${tagPrefix}${version2.major}`;
      tags.push(majorTag);
    }
  } else if (version2.revisionType) {
    const revisionTag = `${tagPrefix}${version2.major}.${version2.minor}.${version2.patch}-${version2.revisionType}`;
    tags.push(revisionTag);
  }
  if (tags.length) {
    for (const tag of tags) {
      await spawn2("git", ["tag", "-fam", versionString, tag, ref]);
    }
    await spawn2("git", [
      "push",
      "-f",
      "origin",
      ...tags.map((t) => `refs/tags/${t}:refs/tags/${t}`)
    ]);
  }
  return tags;
}

// src/util/gitConfig.ts
async function gitConfig(env) {
  const name = env.GITHUB_ACTOR || "github-actions[bot]";
  const email = env.GITHUB_ACTOR ? `${env.GITHUB_ACTOR}@users.noreply.github.com` : "41898282+github-actions[bot]@users.noreply.github.com";
  await spawn2("git", ["config", "--global", "user.name", name]);
  await spawn2("git", ["config", "--global", "user.email", email]);
}

// src/index.ts
async function run(env = process.env) {
  try {
    const packages = ["semantic-release", "debug"];
    const config = getConfig(core2.getInput("config", { required: false }), defaultConfig_default, packages);
    const plugins2 = Array.from(config.plugins ?? []);
    const dryRun = Boolean(safeParse(core2.getInput("dry", { required: false })));
    const debug3 = Boolean(safeParse(core2.getInput("debug", { required: false }))) || core2.isDebug();
    const force = core2.getInput("force", { required: false });
    if (debug3) {
      let c = [
        `Context:`,
        `  cwd: ${process.cwd()}`,
        `  env:`
      ];
      for (const k of Object.keys(env)) {
        c.push(`    ${k}:${/token/i.test(k) ? "***" : env[k] ?? ""}`);
      }
      core2.debug(c.join("\n"));
      packages.push("env-ci");
    }
    const log = debug3 ? core2.info : core2.debug;
    plugins2.forEach((p) => {
      const pDef = Array.isArray(p) ? p[0] : typeof p === "object" ? p.path : p;
      if (typeof pDef === "string" && pDef !== "") {
        packages.push(pDef);
      }
    });
    if (config.preset) {
      packages.push(`conventional-changelog-${String(config.preset)}`);
    }
    await install(packages, log, debug3);
    if (dryRun) {
      log("DRY RUN");
    }
    if (debug3) {
      const { default: debugLib } = await import("debug");
      debugLib.enable("semantic-release:*");
      const { default: envCi } = await Promise.resolve().then(() => (init_env_ci(), env_ci_exports));
      core2.debug(`Environment identified by \`env-ci\`: ${JSON.stringify(envCi(), null, 2)}`);
    }
    plugins2.push(forceRelease_exports, initialRelease_exports);
    const { default: semanticRelease } = await import("semantic-release");
    const result = await semanticRelease({
      ...config,
      plugins: plugins2,
      dryRun
    }, {
      env: {
        ...env,
        RELEASE_FORCE: force || env.force || ""
      }
    });
    if (result === false) {
      core2.info("Release skipped");
      return;
    }
    const { lastRelease, nextRelease, commits, releases } = result;
    core2.info("\n");
    core2.info(`${nextRelease.type} release: ${lastRelease.version} -> ${nextRelease.version}`);
    core2.info(` including ${commits.length} commits`);
    releases.map((r) => core2.info(`-> Released ${String(r.name)} by ${r.pluginName}: ${String(r.url)}`));
    core2.setOutput("lastVersion", lastRelease.version);
    core2.setOutput("type", nextRelease.type);
    core2.setOutput("version", nextRelease.version);
    core2.setOutput("gitTag", nextRelease.gitTag);
    const versionRegExp = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:[-](?<revision>(?:(?<revisionType>\w+)\.)?\d+))?/;
    const version2 = nextRelease.version.match(versionRegExp)?.groups;
    Object.entries(version2).forEach(([k, v]) => core2.setOutput(k, v ?? ""));
    core2.setOutput("notes", nextRelease.notes);
    if (!dryRun) {
      const [tagPrefix] = nextRelease.gitTag.split(nextRelease.version);
      await gitConfig(env);
      const updatedTags = await updateTags("HEAD", nextRelease.version, version2, tagPrefix);
      if (updatedTags.length) {
        core2.info(`Updated tags: ${updatedTags.join(", ")}`);
      }
    }
  } catch (e) {
    core2.setFailed((hasProp(e, "message") ? e.message : void 0) ?? e);
  }
}
function hasProp(obj, key) {
  return Boolean(obj && typeof obj === "object" && key in obj);
}
function safeParse(val) {
  try {
    return JSON.parse(val);
  } catch (e) {
    return void 0;
  }
}
function getConfig(configInput, defaultConfig, packages) {
  if (configInput[0] === ".") {
    return {
      ...defaultConfig,
      extends: configInput
    };
  } else if (configInput[0] === "{") {
    try {
      return {
        ...defaultConfig,
        ...JSON.parse(configInput)
      };
    } catch (e) {
      throw "Invalid inline config";
    }
  } else if (configInput !== "") {
    packages.push(configInput);
    return {
      ...defaultConfig,
      extends: configInput
    };
  }
  return defaultConfig;
}

// src/action.ts
void run();
