// ==UserScript==
// @name         ScoDoc - Remplissage de notes
// @namespace    http://scodoc.iut.cyu.fr/
// @version      1.3.0
// @description  Remplissage des notes sur Scodoc depuis un fichier .csv
// @author       IUT CY Paris Université
// @match        http*://scodoc.iut.cyu.fr/*
// @grant        none
// @date         17/10/2024
// ==/UserScript==
/* eslint-disable */
                
(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.ScodocFillingGrades = {}));
})(this, function(exports2) {
  "use strict";
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var csv2json$1 = { exports: {} };
  (function(module2, exports3) {
    (function() {
      var errorDetectingSeparator = "We could not detect the separator.", errorEmpty = "Empty CSV. Please provide something.", errorEmptyHeader = "Could not detect header. Ensure first row cotains your column headers.", separators = [",", ";", "	"], pegjsSeparatorNames = {
        ",": "comma",
        ";": "semicolon",
        "	": "tab"
      };
      function detectSeparator(csv) {
        var counts = {}, sepMax;
        separators.forEach(function(sep, i) {
          var re = new RegExp(sep, "g");
          counts[sep] = (csv.match(re) || []).length;
          sepMax = !sepMax || counts[sep] > counts[sepMax] ? sep : sepMax;
        });
        return sepMax;
      }
      function zip() {
        var args = [].slice.call(arguments);
        var longest = args.reduce(function(a, b) {
          return a.length > b.length ? a : b;
        }, []);
        return longest.map(function(_, i) {
          return args.map(function(array) {
            return array[i];
          });
        });
      }
      function uniquify(keys) {
        var counts = {};
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (counts[key] === void 0) {
            counts[key] = 0;
          } else {
            counts[key]++;
          }
        }
        var result = [];
        for (var i = keys.length - 1; i >= 0; i--) {
          var key = keys[i];
          if (counts[key] > 0)
            key = key + "__" + counts[key]--;
          result.unshift(key);
        }
        return result;
      }
      function convert(csv, options) {
        options || (options = {});
        if (csv.length == 0)
          throw errorEmpty;
        var separator = options.separator || detectSeparator(csv);
        if (!separator)
          throw errorDetectingSeparator;
        var a = [];
        try {
          var a = csvParser.parse(csv, pegjsSeparatorNames[separator]);
        } catch (error) {
          var start = csv.lastIndexOf("\n", error.offset), end = csv.indexOf("\n", error.offset), line = csv.substring(start >= -1 ? start : 0, end > -1 ? end : csv.length);
          throw error.message + " On line " + error.line + " and column " + error.column + ".\n" + line;
        }
        if (options.transpose)
          a = zip.apply(this, a);
        var keys = a.shift();
        if (keys.length == 0)
          throw errorEmptyHeader;
        keys = keys.map(function(key) {
          return key.trim().replace(/(^")|("$)/g, "");
        });
        keys = uniquify(keys);
        var json = options.hash ? {} : [];
        for (var l = 0; l < a.length; l++) {
          var row = {}, hashKey;
          for (var i = 0; i < keys.length; i++) {
            var value = (a[l][i] || "").trim().replace(/(^")|("$)/g, "");
            var number = value === "" ? NaN : value - 0;
            if (options.hash && i == 0) {
              hashKey = value;
            } else {
              if (options.parseJSON || options.parseNumbers && !isNaN(number)) {
                try {
                  row[keys[i]] = JSON.parse(value);
                } catch (error) {
                  row[keys[i]] = value;
                }
              } else {
                row[keys[i]] = value;
              }
            }
          }
          if (options.hash)
            json[hashKey] = row;
          else
            json.push(row);
        }
        return json;
      }
      var csvParser = function() {
        function quote(s) {
          return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"';
        }
        var result = {
          /*
           * Parses the input with a generated parser. If the parsing is successfull,
           * returns a value explicitly or implicitly specified by the grammar from
           * which the parser was generated (see |PEG.buildParser|). If the parsing is
           * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
           */
          parse: function(input, startRule) {
            var parseFunctions = {
              "comma": parse_comma,
              "semicolon": parse_semicolon,
              "tab": parse_tab,
              "sv": parse_sv,
              "line": parse_line,
              "field": parse_field,
              "char": parse_char
            };
            if (startRule !== void 0) {
              if (parseFunctions[startRule] === void 0) {
                throw new Error("Invalid rule name: " + quote(startRule) + ".");
              }
            } else {
              startRule = "comma";
            }
            var pos = 0;
            var rightmostFailuresPos = 0;
            var rightmostFailuresExpected = [];
            function matchFailed(failure) {
              if (pos < rightmostFailuresPos) {
                return;
              }
              if (pos > rightmostFailuresPos) {
                rightmostFailuresPos = pos;
                rightmostFailuresExpected = [];
              }
              rightmostFailuresExpected.push(failure);
            }
            function parse_comma() {
              var result0, result1;
              var pos0, pos1;
              pos0 = pos;
              pos1 = pos;
              result0 = function(offset2) {
                return separator = ",";
              }() ? "" : null;
              if (result0 !== null) {
                result1 = parse_sv();
                if (result1 !== null) {
                  result0 = [result0, result1];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, sv) {
                  return sv;
                }(pos0, result0[1]);
              }
              if (result0 === null) {
                pos = pos0;
              }
              return result0;
            }
            function parse_semicolon() {
              var result0, result1;
              var pos0, pos1;
              pos0 = pos;
              pos1 = pos;
              result0 = function(offset2) {
                return separator = ";";
              }() ? "" : null;
              if (result0 !== null) {
                result1 = parse_sv();
                if (result1 !== null) {
                  result0 = [result0, result1];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, sv) {
                  return sv;
                }(pos0, result0[1]);
              }
              if (result0 === null) {
                pos = pos0;
              }
              return result0;
            }
            function parse_tab() {
              var result0, result1;
              var pos0, pos1;
              pos0 = pos;
              pos1 = pos;
              result0 = function(offset2) {
                return separator = "	";
              }() ? "" : null;
              if (result0 !== null) {
                result1 = parse_sv();
                if (result1 !== null) {
                  result0 = [result0, result1];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, sv) {
                  return sv;
                }(pos0, result0[1]);
              }
              if (result0 === null) {
                pos = pos0;
              }
              return result0;
            }
            function parse_sv() {
              var result0, result1, result22, result3, result4;
              var pos0, pos1, pos2, pos3;
              pos0 = pos;
              pos1 = pos;
              result0 = [];
              if (/^[\n\r]/.test(input.charAt(pos))) {
                result1 = input.charAt(pos);
                pos++;
              } else {
                result1 = null;
                {
                  matchFailed("[\\n\\r]");
                }
              }
              while (result1 !== null) {
                result0.push(result1);
                if (/^[\n\r]/.test(input.charAt(pos))) {
                  result1 = input.charAt(pos);
                  pos++;
                } else {
                  result1 = null;
                  {
                    matchFailed("[\\n\\r]");
                  }
                }
              }
              if (result0 !== null) {
                result1 = parse_line();
                if (result1 !== null) {
                  result22 = [];
                  pos2 = pos;
                  pos3 = pos;
                  if (/^[\n\r]/.test(input.charAt(pos))) {
                    result4 = input.charAt(pos);
                    pos++;
                  } else {
                    result4 = null;
                    {
                      matchFailed("[\\n\\r]");
                    }
                  }
                  if (result4 !== null) {
                    result3 = [];
                    while (result4 !== null) {
                      result3.push(result4);
                      if (/^[\n\r]/.test(input.charAt(pos))) {
                        result4 = input.charAt(pos);
                        pos++;
                      } else {
                        result4 = null;
                        {
                          matchFailed("[\\n\\r]");
                        }
                      }
                    }
                  } else {
                    result3 = null;
                  }
                  if (result3 !== null) {
                    result4 = parse_line();
                    if (result4 !== null) {
                      result3 = [result3, result4];
                    } else {
                      result3 = null;
                      pos = pos3;
                    }
                  } else {
                    result3 = null;
                    pos = pos3;
                  }
                  if (result3 !== null) {
                    result3 = function(offset2, data) {
                      return data;
                    }(pos2, result3[1]);
                  }
                  if (result3 === null) {
                    pos = pos2;
                  }
                  while (result3 !== null) {
                    result22.push(result3);
                    pos2 = pos;
                    pos3 = pos;
                    if (/^[\n\r]/.test(input.charAt(pos))) {
                      result4 = input.charAt(pos);
                      pos++;
                    } else {
                      result4 = null;
                      {
                        matchFailed("[\\n\\r]");
                      }
                    }
                    if (result4 !== null) {
                      result3 = [];
                      while (result4 !== null) {
                        result3.push(result4);
                        if (/^[\n\r]/.test(input.charAt(pos))) {
                          result4 = input.charAt(pos);
                          pos++;
                        } else {
                          result4 = null;
                          {
                            matchFailed("[\\n\\r]");
                          }
                        }
                      }
                    } else {
                      result3 = null;
                    }
                    if (result3 !== null) {
                      result4 = parse_line();
                      if (result4 !== null) {
                        result3 = [result3, result4];
                      } else {
                        result3 = null;
                        pos = pos3;
                      }
                    } else {
                      result3 = null;
                      pos = pos3;
                    }
                    if (result3 !== null) {
                      result3 = function(offset2, data) {
                        return data;
                      }(pos2, result3[1]);
                    }
                    if (result3 === null) {
                      pos = pos2;
                    }
                  }
                  if (result22 !== null) {
                    result3 = [];
                    if (/^[\n\r]/.test(input.charAt(pos))) {
                      result4 = input.charAt(pos);
                      pos++;
                    } else {
                      result4 = null;
                      {
                        matchFailed("[\\n\\r]");
                      }
                    }
                    while (result4 !== null) {
                      result3.push(result4);
                      if (/^[\n\r]/.test(input.charAt(pos))) {
                        result4 = input.charAt(pos);
                        pos++;
                      } else {
                        result4 = null;
                        {
                          matchFailed("[\\n\\r]");
                        }
                      }
                    }
                    if (result3 !== null) {
                      result0 = [result0, result1, result22, result3];
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, first, rest) {
                  rest.unshift(first);
                  return rest;
                }(pos0, result0[1], result0[2]);
              }
              if (result0 === null) {
                pos = pos0;
              }
              return result0;
            }
            function parse_line() {
              var result0, result1, result22, result3, result4;
              var pos0, pos1, pos2, pos3;
              pos0 = pos;
              pos1 = pos;
              result0 = parse_field();
              if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                pos3 = pos;
                if (input.length > pos) {
                  result22 = input.charAt(pos);
                  pos++;
                } else {
                  result22 = null;
                  {
                    matchFailed("any character");
                  }
                }
                if (result22 !== null) {
                  result3 = function(offset2, char) {
                    return char == separator;
                  }(pos, result22) ? "" : null;
                  if (result3 !== null) {
                    result4 = parse_field();
                    if (result4 !== null) {
                      result22 = [result22, result3, result4];
                    } else {
                      result22 = null;
                      pos = pos3;
                    }
                  } else {
                    result22 = null;
                    pos = pos3;
                  }
                } else {
                  result22 = null;
                  pos = pos3;
                }
                if (result22 !== null) {
                  result22 = function(offset2, char, text) {
                    return text;
                  }(pos2, result22[0], result22[2]);
                }
                if (result22 === null) {
                  pos = pos2;
                }
                while (result22 !== null) {
                  result1.push(result22);
                  pos2 = pos;
                  pos3 = pos;
                  if (input.length > pos) {
                    result22 = input.charAt(pos);
                    pos++;
                  } else {
                    result22 = null;
                    {
                      matchFailed("any character");
                    }
                  }
                  if (result22 !== null) {
                    result3 = function(offset2, char) {
                      return char == separator;
                    }(pos, result22) ? "" : null;
                    if (result3 !== null) {
                      result4 = parse_field();
                      if (result4 !== null) {
                        result22 = [result22, result3, result4];
                      } else {
                        result22 = null;
                        pos = pos3;
                      }
                    } else {
                      result22 = null;
                      pos = pos3;
                    }
                  } else {
                    result22 = null;
                    pos = pos3;
                  }
                  if (result22 !== null) {
                    result22 = function(offset2, char, text) {
                      return text;
                    }(pos2, result22[0], result22[2]);
                  }
                  if (result22 === null) {
                    pos = pos2;
                  }
                }
                if (result1 !== null) {
                  result22 = function(offset2, first, rest) {
                    return !!first || rest.length;
                  }(pos, result0, result1) ? "" : null;
                  if (result22 !== null) {
                    result0 = [result0, result1, result22];
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, first, rest) {
                  rest.unshift(first);
                  return rest;
                }(pos0, result0[0], result0[1]);
              }
              if (result0 === null) {
                pos = pos0;
              }
              return result0;
            }
            function parse_field() {
              var result0, result1, result22;
              var pos0, pos1, pos2;
              pos0 = pos;
              pos1 = pos;
              if (input.charCodeAt(pos) === 34) {
                result0 = '"';
                pos++;
              } else {
                result0 = null;
                {
                  matchFailed('"\\""');
                }
              }
              if (result0 !== null) {
                result1 = [];
                result22 = parse_char();
                while (result22 !== null) {
                  result1.push(result22);
                  result22 = parse_char();
                }
                if (result1 !== null) {
                  if (input.charCodeAt(pos) === 34) {
                    result22 = '"';
                    pos++;
                  } else {
                    result22 = null;
                    {
                      matchFailed('"\\""');
                    }
                  }
                  if (result22 !== null) {
                    result0 = [result0, result1, result22];
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, text) {
                  return text.join("");
                }(pos0, result0[1]);
              }
              if (result0 === null) {
                pos = pos0;
              }
              if (result0 === null) {
                pos0 = pos;
                result0 = [];
                pos1 = pos;
                pos2 = pos;
                if (/^[^\n\r]/.test(input.charAt(pos))) {
                  result1 = input.charAt(pos);
                  pos++;
                } else {
                  result1 = null;
                  {
                    matchFailed("[^\\n\\r]");
                  }
                }
                if (result1 !== null) {
                  result22 = function(offset2, char) {
                    return char != separator;
                  }(pos, result1) ? "" : null;
                  if (result22 !== null) {
                    result1 = [result1, result22];
                  } else {
                    result1 = null;
                    pos = pos2;
                  }
                } else {
                  result1 = null;
                  pos = pos2;
                }
                if (result1 !== null) {
                  result1 = function(offset2, char) {
                    return char;
                  }(pos1, result1[0]);
                }
                if (result1 === null) {
                  pos = pos1;
                }
                while (result1 !== null) {
                  result0.push(result1);
                  pos1 = pos;
                  pos2 = pos;
                  if (/^[^\n\r]/.test(input.charAt(pos))) {
                    result1 = input.charAt(pos);
                    pos++;
                  } else {
                    result1 = null;
                    {
                      matchFailed("[^\\n\\r]");
                    }
                  }
                  if (result1 !== null) {
                    result22 = function(offset2, char) {
                      return char != separator;
                    }(pos, result1) ? "" : null;
                    if (result22 !== null) {
                      result1 = [result1, result22];
                    } else {
                      result1 = null;
                      pos = pos2;
                    }
                  } else {
                    result1 = null;
                    pos = pos2;
                  }
                  if (result1 !== null) {
                    result1 = function(offset2, char) {
                      return char;
                    }(pos1, result1[0]);
                  }
                  if (result1 === null) {
                    pos = pos1;
                  }
                }
                if (result0 !== null) {
                  result0 = function(offset2, text) {
                    return text.join("");
                  }(pos0, result0);
                }
                if (result0 === null) {
                  pos = pos0;
                }
              }
              return result0;
            }
            function parse_char() {
              var result0, result1;
              var pos0, pos1;
              pos0 = pos;
              pos1 = pos;
              if (input.charCodeAt(pos) === 34) {
                result0 = '"';
                pos++;
              } else {
                result0 = null;
                {
                  matchFailed('"\\""');
                }
              }
              if (result0 !== null) {
                if (input.charCodeAt(pos) === 34) {
                  result1 = '"';
                  pos++;
                } else {
                  result1 = null;
                  {
                    matchFailed('"\\""');
                  }
                }
                if (result1 !== null) {
                  result0 = [result0, result1];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2) {
                  return '"';
                }();
              }
              if (result0 === null) {
                pos = pos0;
              }
              if (result0 === null) {
                if (/^[^"]/.test(input.charAt(pos))) {
                  result0 = input.charAt(pos);
                  pos++;
                } else {
                  result0 = null;
                  {
                    matchFailed('[^"]');
                  }
                }
              }
              return result0;
            }
            function cleanupExpected(expected) {
              expected.sort();
              var lastExpected = null;
              var cleanExpected = [];
              for (var i = 0; i < expected.length; i++) {
                if (expected[i] !== lastExpected) {
                  cleanExpected.push(expected[i]);
                  lastExpected = expected[i];
                }
              }
              return cleanExpected;
            }
            function computeErrorPosition() {
              var line = 1;
              var column = 1;
              var seenCR = false;
              for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
                var ch = input.charAt(i);
                if (ch === "\n") {
                  if (!seenCR) {
                    line++;
                  }
                  column = 1;
                  seenCR = false;
                } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                  line++;
                  column = 1;
                  seenCR = true;
                } else {
                  column++;
                  seenCR = false;
                }
              }
              return { line, column };
            }
            var separator = ",";
            var result2 = parseFunctions[startRule]();
            if (result2 === null || pos !== input.length) {
              var offset = Math.max(pos, rightmostFailuresPos);
              var found = offset < input.length ? input.charAt(offset) : null;
              var errorPosition = computeErrorPosition();
              throw new this.SyntaxError(
                cleanupExpected(rightmostFailuresExpected),
                found,
                offset,
                errorPosition.line,
                errorPosition.column
              );
            }
            return result2;
          },
          /* Returns the parser source code. */
          toSource: function() {
            return this._source;
          }
        };
        result.SyntaxError = function(expected, found, offset, line, column) {
          function buildMessage(expected2, found2) {
            var expectedHumanized, foundHumanized;
            switch (expected2.length) {
              case 0:
                expectedHumanized = "end of input";
                break;
              case 1:
                expectedHumanized = expected2[0];
                break;
              default:
                expectedHumanized = expected2.slice(0, expected2.length - 1).join(", ") + " or " + expected2[expected2.length - 1];
            }
            foundHumanized = found2 ? quote(found2) : "end of input";
            return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
          }
          this.name = "SyntaxError";
          this.expected = expected;
          this.found = found;
          this.message = buildMessage(expected, found);
          this.offset = offset;
          this.line = line;
          this.column = column;
        };
        result.SyntaxError.prototype = Error.prototype;
        return result;
      }();
      {
        if (module2.exports) {
          exports3 = module2.exports = convert;
        }
        exports3.csv2json = convert;
      }
    }).call(commonjsGlobal);
  })(csv2json$1, csv2json$1.exports);
  var csv2jsonExports = csv2json$1.exports;
  const csv2json = /* @__PURE__ */ getDefaultExportFromCjs(csv2jsonExports);
  const defaultJSONColumnsNames = ["Nom", "Prénom", "Notes"];
  let JSONColumnsNames = defaultJSONColumnsNames;
  let listStudentsUnknown = [];
  let listStudentsWithInvalidGrade = [];
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const DOM = {
    listGradesRows: Array.from(document.querySelectorAll("tr.etud_elem")),
    formContainer: document.getElementById("tp-ext-form-container"),
    maxGrade: document.querySelector(".tf-ro-field.formnote_bareme")
  };
  const listEmptyValues = ["", "abs", "exc"];
  const fillGrades = async (listGrades, dom, maxGrade) => {
    dom.uploadBtn.disabled = true;
    const lastNameKey = JSONColumnsNames[0];
    const firstNameKey = JSONColumnsNames[1];
    const gradesKey = JSONColumnsNames[2];
    const specialCharsRegex = /[\u0300-\u036f]/g;
    for (const item of listGrades) {
      await delay(0);
      const currentStudentRow = dom.listGradesRows.find((el) => {
        const studentNameCell = el.getElementsByClassName("tf-fieldlabel")[0];
        if (!studentNameCell) {
          return;
        }
        const cellText = studentNameCell.textContent.normalize("NFD").replaceAll(specialCharsRegex, "").replaceAll("-", " ").toLowerCase();
        const cleanedLastName = item[lastNameKey].normalize("NFD").replaceAll(specialCharsRegex, "").replaceAll("-", " ").toLowerCase();
        const cleanedFirstName = item[firstNameKey].normalize("NFD").replaceAll(specialCharsRegex, "").replaceAll("-", " ").toLowerCase();
        const isFirstNameMatched = cleanedFirstName.split(" ").some((_item) => cellText.includes(_item));
        const isLastNameMatched = cleanedLastName.split(" ").some((_item) => cellText.includes(_item));
        return isFirstNameMatched && isLastNameMatched;
      });
      if (!currentStudentRow) {
        listStudentsUnknown.push(
          `${item[lastNameKey].toUpperCase()} ${item[firstNameKey]}`
        );
        continue;
      }
      const currentStudentRowInput = currentStudentRow.querySelector(
        'input[class^="note"]'
      );
      if (currentStudentRowInput) {
        const formattedGrade = String(item[gradesKey]).replace(",", ".");
        const isNotAValidGrade = Number.isNaN(Number(formattedGrade));
        const isAValidGrade = !isNotAValidGrade;
        const grade = isNotAValidGrade ? item[gradesKey] : Number(formattedGrade);
        currentStudentRowInput.focus();
        if (isAValidGrade && (listEmptyValues.includes(currentStudentRowInput.value.trim().toLowerCase()) || grade > currentStudentRowInput.value)) {
          currentStudentRowInput.value = grade;
          if (grade > maxGrade || grade < 0) {
            listStudentsWithInvalidGrade.push(
              `${item[lastNameKey].toUpperCase()} ${item[firstNameKey]}`
            );
          }
        }
        currentStudentRowInput.setAttribute("data-modified", true);
        write_on_blur == null ? void 0 : write_on_blur(currentStudentRowInput);
        currentStudentRowInput.style.backgroundColor = "#DAEBD6B9";
      }
    }
  };
  const resetTpl = () => {
    document.querySelector("#grades_file").value = "";
    DOM.firstStep.style.display = "block";
    DOM.resetContainer.style.display = "none";
  };
  const isScodocMaxGradeMatchWithFileMaxGrade = (dom) => {
    var _a, _b;
    const scodocMaxGrade = Number(((_a = dom.maxGrade.textContent.match(/\d+(\.\d+)?/)) == null ? void 0 : _a[0]) || 20);
    const fileGradeCol = JSONColumnsNames.find(
      (item) => item.toLowerCase().includes("note")
    ).replace(",", ".");
    const fileMaxGrade = (_b = fileGradeCol.match(/\d+(\.\d+)?/)) == null ? void 0 : _b[0];
    return {
      isMatching: true,
      scodocMaxGrade,
      fileMaxGrade
    };
  };
  const manageFileUpload = ({ target: evtFile, valForMissingGrade, dom }) => {
    const file = evtFile.target.files[0];
    const name2 = file.name;
    const lastDot = name2.lastIndexOf(".");
    const listAllowedFormats = ["csv"];
    const ext = name2.substring(lastDot + 1);
    if (!listAllowedFormats.includes(ext)) {
      alert(
        `Votre fichier n'est pas au format ${listAllowedFormats.join(
          " ou "
        )}`
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (eRaw) => {
      try {
        new TextDecoder("utf8", { fatal: true }).decode(eRaw.target.result);
      } catch (e) {
        alert(
          "Votre fichier doit être encodé en UTF-8. Veuillez effectuer ce changement."
        );
        resetTpl();
        return;
      }
      console.log("fefefe 114");
      reader.readAsText(file);
      reader.onload = async (e) => {
        let listGrades = csv2json(e.target.result, {
          parseNumbers: true
        });
        if (listGrades.some((item) => Object.keys(item).length !== 3)) {
          alert("Votre fichier ne contient pas que trois colonnes.");
          return;
        }
        JSONColumnsNames = Object.keys(listGrades[0]);
        const gradesComparisonInfos = isScodocMaxGradeMatchWithFileMaxGrade(dom);
        listStudentsUnknown = [];
        await fillGrades(listGrades, dom, gradesComparisonInfos.scodocMaxGrade);
        const unknownStudentTplRaw = document.querySelector("[data-template-id='unknown-student']");
        const studentsUnknownContainer = document.querySelector("[data-unknown-students]");
        const listStudentsUnknownDOM = studentsUnknownContainer.querySelector("ul");
        listStudentsUnknownDOM.replaceChildren();
        const nbUnknownStudents = document.querySelector("[data-nb-unknown-students]");
        nbUnknownStudents.textContent = listStudentsUnknown.length;
        if (listStudentsUnknown.length > 0) {
          studentsUnknownContainer.style.display = "";
          listStudentsUnknown.forEach((_item) => {
            const unknownStudentTpl = unknownStudentTplRaw.content.cloneNode(true);
            unknownStudentTpl.querySelector("li").textContent = _item;
            listStudentsUnknownDOM.append(unknownStudentTpl);
          });
        } else {
          studentsUnknownContainer.style.display = "none";
        }
        const studentsWithInvalidGradeContainer = document.querySelector("[data-invalid-grades]");
        const listStudentsWithInvalidGradeDOM = studentsWithInvalidGradeContainer.querySelector("ul");
        listStudentsWithInvalidGradeDOM.replaceChildren();
        const nbInvalidGradeStudents = document.querySelector("[data-nb-invalid-grade-students]");
        nbInvalidGradeStudents.textContent = listStudentsWithInvalidGrade.length;
        if (listStudentsWithInvalidGrade.length > 0) {
          studentsWithInvalidGradeContainer.style.display = "";
          listStudentsWithInvalidGrade.forEach((_item) => {
            const unknownStudentTpl = unknownStudentTplRaw.content.cloneNode(true);
            unknownStudentTpl.querySelector("li").textContent = _item;
            listStudentsWithInvalidGradeDOM.append(unknownStudentTpl);
          });
        } else {
          studentsWithInvalidGradeContainer.style.display = "none";
        }
        Array.from(document.querySelectorAll(".note")).forEach(
          (input) => {
            if (listEmptyValues.includes(input.value.trim().toLowerCase())) {
              input.value = valForMissingGrade;
            }
          }
        );
        DOM.uploadBtn.disabled = false;
        DOM.firstStep.style.display = "none";
        DOM.resetContainer.style.display = "block";
      };
    };
    reader.readAsArrayBuffer(file);
  };
  const delegateEvtHandler = (el, evt, sel, handler) => {
    el.addEventListener(evt, function(event) {
      let t = event.target;
      while (t && t !== this) {
        if (t.matches(sel)) {
          handler.call(t, event);
        }
        t = t.parentNode;
      }
    });
  };
  const forceSave = () => {
    document.querySelectorAll("[data-etudid]").forEach((item) => {
      item.setAttribute("data-modified", "true");
      write_on_blur == null ? void 0 : write_on_blur(item);
    });
  };
  const formTpl = `<style>\r
    .tp-ext-form-container {\r
        font-family: Helvetica, Arial, sans-serif;\r
        position: fixed;\r
        background-color: white;\r
        top: 12px;\r
        right: 10px;\r
        padding: 1.5em;\r
        border: 2px solid #333333;\r
        max-width: 450px;\r
        overflow: hidden;\r
        border-radius: 0.35rem;\r
        max-height: 85vh;\r
        overflow-y: auto;\r
        z-index: 9999;\r
\r
        @media (max-width: 768px) {\r
            position: static;\r
            margin: 0.95rem;\r
            max-width: none;\r
            max-height: none;\r
        }\r
    }\r
\r
    .tp-ext-form-title {\r
        font-weight: bold;\r
        border: 0;\r
        margin-bottom: 0;\r
        width: auto;\r
        font-size: 1.05rem;\r
        padding: 0 0.5rem;\r
        background-color: white;\r
    }\r
\r
    .tp-ext-valid-file {\r
        color: green;\r
    }\r
\r
    .tp-ext-empty-values-list-choices {\r
        display: flex;\r
        justify-content: space-around;\r
        list-style-type: none;\r
        flex-direction: column;\r
        padding-left: 0;\r
        margin-bottom: 1.35rem;\r
        margin-top: 0;\r
    }\r
\r
    .tp-text-bold {\r
        font-weight: bold;\r
    }\r
\r
    .tp-ext-form-container-hidden {\r
        height: 0;\r
        padding-bottom: 0;\r
    }\r
\r
    .tp-upload-area {\r
        text-align: center;\r
        padding: 0.75rem;\r
        border: 2px dashed black;\r
        border-radius: 0.35rem;\r
\r
        &.over {\r
            border-color: rgb(29 78 216);\r
        }\r
\r
        p {\r
            margin: 0.5rem 0;\r
        }\r
    }\r
\r
    .tp-upload-btn {\r
        padding: 0.5rem 1rem;\r
        background-color: rgb(29 78 216);\r
        color: white;\r
        border-radius: 0.5rem;\r
        position: relative;\r
        border: none;\r
        display: inline-block;\r
\r
        input {\r
            width: 0;\r
            height: 0;\r
            position: absolute;\r
        }\r
\r
        &:not(:has([disabled])) {\r
            &:hover,\r
            &:focus-within,\r
            &.over {\r
                filter: brightness(80%);\r
            }\r
        }\r
    }\r
\r
    .tp-form-title {\r
        font-size: 1.15rem;\r
        font-weight: bold;\r
        margin: 0.95rem 0 0.35rem;\r
    }\r
\r
    .tp-secondary-btn {\r
        padding: 0.5rem 1rem;\r
        background-color: rgb(223, 223, 223);\r
        color: black;\r
        border-radius: 0.5rem;\r
        display: none;\r
        border: none;\r
    }\r
\r
    .tp-label {\r
        display: flex;\r
        gap: 0.6rem;\r
        font-weight: normal;\r
    }\r
\r
    .tp-label input {\r
        margin: 0;\r
    }\r
\r
    .tp-list-infos {\r
        margin-top: 0.35rem;\r
    }\r
\r
    .tp-small-text {\r
        font-size: 0.85rem;\r
    }\r
</style>\r
<form enctype="multipart/form-data; charset=utf-8">\r
    <fieldset class="tp-ext-form-container" id="tp-ext-form-container">\r
        <legend class="tp-ext-form-title" data-project-name>\r
            Remplisseur automatique de notes\r
        </legend>\r
\r
        <p style="margin: 0">\r
            Prenez bien soin à respecter les règles suivantes :\r
        </p>\r
        <ul class="tp-list-infos">\r
            <li>Format de fichier .csv</li>\r
            <li>\r
                Le fichier (.csv)\r
                <span class="tp-text-bold">doit contenir trois colonnes</span>.\r
                La première doit représenter les noms, la seconde les prénoms et\r
                la dernière les notes\r
            </li>\r
        </ul>\r
        <p style="margin: 0">A noter :</p>\r
        <ul class="tp-list-infos">\r
            <li>La note la plus haute sera prise en compte</li>\r
            <li>\r
                Si une absence/note neutralisée/note en attente sera transformée\r
                en vraie note l'inverse est faux\r
            </li>\r
            <li class="tp-text-bold">\r
                Le fichier doit être encodé en Unicode UTF-8. Sinon ça ne\r
                fonctionnera pas\r
            </li>\r
        </ul>\r
        <hr />\r
\r
        <div data-first-step>\r
            <p class="tp-form-title">Gestion des notes manquantes</p>\r
            <ul class="tp-ext-empty-values-list-choices">\r
                <li>\r
                    <label id="att" class="tp-label">\r
                        <span>Mettre les notes en absent (ABS)</span>\r
                        <input\r
                            type="radio"\r
                            name="empty_val"\r
                            id="att"\r
                            value="ABS"\r
                            checked\r
                        />\r
                    </label>\r
                </li>\r
                <li>\r
                    <label id="exc" class="tp-label">\r
                        <span>Excuser les notes (EXC)</span>\r
                        <input\r
                            type="radio"\r
                            name="empty_val"\r
                            id="exc"\r
                            value="EXC"\r
                        />\r
                    </label>\r
                </li>\r
            </ul>\r
\r
            <p class="tp-form-title">Fichier CSV</p>\r
\r
            <div data-drag-n-drop-area class="tp-upload-area">\r
                <p>Glissez-déposez votre fichier csv</p>\r
                <p>ou</p>\r
                <label id="grades_field" class="tp-upload-btn">\r
                    <span>Sélectionnez un fichier csv</span>\r
                    <input\r
                        type="file"\r
                        name="grades_file"\r
                        id="grades_file"\r
                        accept=".csv"\r
                        data-upload-btn=""\r
                    />\r
                </label>\r
                <p\r
                    style="font-size: 0.9rem; margin-top: 1.25rem"\r
                    class="tp-text-bold"\r
                >\r
                    Fichier .csv encodé UTF-8 uniquement\r
                </p>\r
            </div>\r
        </div>\r
\r
        <div data-restart-upload-container>\r
            <p class="tp-ext-valid-file">Fichier valide. Notes intégrées.</p>\r
            <details style="margin-bottom: 1rem" data-unknown-students>\r
                <summary>\r
                    Liste des étudiants inconnus (<span\r
                        data-nb-unknown-students\r
                    ></span\r
                    >)\r
                </summary>\r
                <ul class="tp-list-infos"></ul>\r
            </details>\r
\r
            <details style="margin-bottom: 1rem" data-invalid-grades>\r
                <summary>\r
                    Liste des étudiants avec note incorrecte (<span\r
                        data-nb-invalid-grade-students\r
                    ></span\r
                    >)\r
                </summary>\r
                <p class="tp-small-text">Ces étudiants ont une note inférieure à 0 ou supérieure à la note maximale définie</p>\r
                <ul class="tp-list-infos"></ul>\r
            </details>\r
\r
            <button type="button" class="tp-upload-btn" data-restart>\r
                Recommencer\r
            </button>\r
            <!-- \r
            <button type="button" class="tp-secondary-btn" data-force-save>\r
                Forcer l'enregistrement\r
            </button> -->\r
        </div>\r
    </fieldset>\r
</form>\r
<template data-template-id="unknown-student">\r
    <li></li>\r
</template>\r
`;
  const name = "scodoc-remplisseur-automatique-notes";
  const version = "1.3.0";
  const description = "";
  const main = "src/index.js";
  const scripts = {
    build: "vite build",
    start: "vite",
    dev: "vite",
    release: "standard-version"
  };
  const keywords = [];
  const author = "";
  const license = "ISC";
  const devDependencies = {
    "csvjson-csv2json": "^5.0.6",
    encoding: "^0.1.13",
    "standard-version": "^9.5.0",
    vite: "^4.4.11"
  };
  const packageJSON = {
    name,
    version,
    description,
    main,
    scripts,
    keywords,
    author,
    license,
    devDependencies,
    "standard-version": {
      scripts: {
        precommit: "vite build"
      }
    }
  };
  let _hasUsedDnDrop = false;
  const hasUsedDnDrop = () => _hasUsedDnDrop;
  const setHasUsedDnDrop = (val) => _hasUsedDnDrop = val;
  (async function() {
    if (DOM.listGradesRows.length === 0 && !DOM.formContainer) {
      return;
    }
    const body = document.getElementsByTagName("body")[0];
    body.insertAdjacentHTML("beforeend", formTpl);
    DOM.dragAndDropArea = document.querySelector("[data-drag-n-drop-area]");
    DOM.resetContainer = document.querySelector("[data-restart-upload-container]");
    DOM.firstStep = document.querySelector("[data-first-step]");
    DOM.uploadBtn = document.querySelector("[data-upload-btn]");
    DOM.resetContainer.style.display = "none";
    document.querySelector("[data-project-name]").textContent += ` v${packageJSON.version}`;
    await Promise.resolve().then(() => dragAndDrop);
    delegateEvtHandler(document, "change", "#grades_file", (e) => {
      document.querySelectorAll("[data-etudid]").forEach((item) => {
        item.style.backgroundColor = "";
      });
      const valForMissingGrade = document.querySelector('input[name="empty_val"]:checked').value || "ABS";
      manageFileUpload({
        target: e,
        valForMissingGrade,
        dom: DOM
      });
    });
    delegateEvtHandler(document, "click", "[data-restart]", () => {
      setHasUsedDnDrop(false);
      resetTpl();
    });
    delegateEvtHandler(document, "click", "[data-force-save]", () => {
      forceSave();
    });
  })();
  const dragAndDropArea = document.querySelector("[data-drag-n-drop-area]");
  ["dragend", "dragleave"].forEach((event) => {
    dragAndDropArea.addEventListener(event, (e) => {
      e.preventDefault();
      e.currentTarget.querySelector(".tp-upload-btn").classList.remove("over");
      e.currentTarget.classList.remove("over");
    });
  });
  dragAndDropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.currentTarget.querySelector(".tp-upload-btn").classList.add("over");
    e.currentTarget.classList.add("over");
  });
  dragAndDropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    e.currentTarget.querySelector(".tp-upload-btn").classList.remove("over");
    e.currentTarget.classList.remove("over");
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((file, i) => {
        if (file.kind === "file") {
          setHasUsedDnDrop(true);
          const input = e.currentTarget.querySelector("input[type='file']");
          input.setAttribute("files", e.dataTransfer.files);
          input.files = e.dataTransfer.files;
          input.dispatchEvent(new Event("change", { "bubbles": true }));
        }
      });
    }
  });
  const dragAndDrop = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null
  }, Symbol.toStringTag, { value: "Module" }));
  exports2.hasUsedDnDrop = hasUsedDnDrop;
  exports2.setHasUsedDnDrop = setHasUsedDnDrop;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
