// Generated by CoffeeScript 1.7.1
(function() {
  var instructions, _;

  _ = Psy._;

  this.AST = {};

  instructions = "<p>\n<p>\n\n# **<span style=\"color:red\">STOP!</span>**\n\n## **READ** the following Instructions **CAREFULLY**\n\n\nArithmetic Systems Task\n==========================\n\n\nThis will be a test of arithmetic skill. You will be solving basic subtraction and multiplication problems.\nProblems will appear on the screen. Solve the problem, and type the answer using the keyboard.\nThen press enter to proceed to the next question.\n\nAnswer as **quickly as possible**.\n\n\nProblems will appear in 2 blocks of 28. 1 of subtraction and 1 of multiplication.\n\nThere will be a short practice set so you can get used to answering.\n\n**Press any key to continue**\n\n";

  this.AST.experiment = {
    Define: {
      task: "",
      active_brain: true
    },
    Routines: {
      Prelude: {
        Events: {
          1: {
            Markdown: instructions,
            Next: {
              AnyKey: ""
            }
          }
        }
      },
      StartPractice: function() {
        this.context.set("task", "practice");
        return {
          Text: {
            content: ["You will now receive 6 practice problems.", "Press any key to continue."],
            origin: "center",
            position: "center"
          },
          Next: {
            AnyKey: {}
          }
        };
      },
      EndPractice: function() {
        return {
          Markdown: "\nGood work!\n==========\n\nWe will now start the test.\n\nRemember to answer as quickly as you possibly can while getting most correct.\n\nType your answer and press ENTER to advance to the next problem.\n\nThere will be no feedback on your performance during the test.\n\nWhen you are ready, press any key. ",
          Next: {
            AnyKey: {}
          }
        };
      },
      Block: {
        StartMult: function() {
          return {
            Events: {
              1: {
                Action: {
                  execute: function(context) {
                    return context.set("task", "real");
                  }
                }
              },
              2: {
                Text: {
                  position: "center",
                  origin: "center",
                  content: ["Get Ready for Multiplication Problems!", "Press any key to start"]
                },
                Next: {
                  AnyKey: ""
                }
              }
            }
          };
        },
        Start: function() {
          return {
            Events: {
              1: {
                Action: {
                  execute: function(context) {
                    return context.set("task", "real");
                  }
                }
              },
              2: {
                Text: {
                  position: "center",
                  origin: "center",
                  content: ["Get Ready for Subtraction Problems!", "Press any key to start"]
                },
                Next: {
                  AnyKey: ""
                }
              }
            }
          };
        },
        End: function() {
          console.log(this.context.userData({
            taskName: "main",
            type: "response",
            name: "Receiver"
          }).get());
          return {
            Text: {
              position: "center",
              origin: "center",
              content: ["End of block", "Press any key to continue"]
            },
            Next: {
              AnyKey: ""
            }
          };
        }
      },
      Trial: function() {
        var op, problem, x1, x2;
        problem = this.trial.Problem.split(/[\\x=-]/);
        x1 = problem[0];
        x2 = problem[1];
        op = this.trial.Operation === "Multiplication" ? "x" : "-";
        return {
          Events: {
            1: {
              FixationCross: {
                fill: "gray"
              },
              Next: {
                Timeout: {
                  duration: 500
                }
              }
            },
            2: {
              Question: {
                position: "center",
                origin: "center",
                width: "33%",
                headerSize: "huge",
                question: x1 + " " + op + " " + x2 + " = " + "?",
                id: "problem" + this.trial.ProblemID,
                type: "textfield",
                react: {
                  change: function(el) {}
                }
              },
              Next: {
                Receiver: {
                  id: "problem" + this.trial.ProblemID,
                  signal: "change",
                  timeout: 6000
                }
              }
            }
          },
          Feedback: function() {
            var message;
            console.log(this.response);
            if (this.context.get("task") === "practice") {
              message = this.response[1].event === "timeout" ? "Too Slow" : this.response[1].event.val === this.response[1].trial.Answer ? "Correct!" : "Incorrect!";
              if (this.response[1].RT > 20000) {
                message += " -- Try to go faster!";
              }
              return {
                Text: {
                  content: message,
                  position: "center",
                  origin: "center"
                },
                Next: {
                  Timeout: {
                    duration: 500
                  }
                }
              };
            }
          }
        };
      },
      Coda: function() {
        return {
          Events: {
            1: {
              Action: {
                execute: function(context) {
                  var dat, logdat, obj;
                  dat = context.userData({
                    taskName: "main",
                    type: "response",
                    name: "Receiver"
                  }).get();
                  logdat = (function() {
                    var _i, _len, _results;
                    _results = [];
                    for (_i = 0, _len = dat.length; _i < _len; _i++) {
                      obj = dat[_i];
                      _results.push({
                        TrialNumber: obj.trialNumber,
                        BlockNumber: obj.blockNumber,
                        RT: obj.RT,
                        Response: obj.event.val,
                        Answer: obj.trial.Answer,
                        Operation: obj.trial.Operation,
                        Correct: obj.event.val === obj.trial.Answer,
                        ProblemID: obj.trial.ProblemID,
                        Problem: obj.trial.Problem,
                        Size: obj.trial.Size,
                        Task: "Arithmetic"
                      });
                    }
                    return _results;
                  })();
                  console.log("logdat", logdat);
                  return context.set("resultObject", logdat);
                }
              }
            },
            2: {
              Text: {
                content: "End of Arithmetic Task",
                position: "center",
                origin: "center"
              },
              Next: {
                Timeout: {
                  duration: 1000
                }
              }
            }
          }
        };
      },
      Save: function() {
        return {
          Action: {
            execute: function(context) {
              var logdat;
              console.log("executing save action");
              console.log("active_brain", context.get("active_brain"));
              if (context.get("active_brain")) {
                logdat = context.get("resultObject");
                console.log("sending data", logdat);
                return $.ajax({
                  type: "POST",
                  url: "/results",
                  data: JSON.stringify(logdat),
                  contentType: "application/json"
                });
              }
            }
          },
          Next: {
            Timeout: {
              duration: 200
            }
          }
        };
      }
    },
    Flow: (function(_this) {
      return function(routines) {
        return {
          1: routines.Prelude,
          2: {
            BlockSequence: {
              name: "practice",
              trialList: _this.AST.trialsPractice,
              start: routines.StartPractice,
              trial: routines.Trial,
              end: routines.EndPractice
            }
          },
          3: {
            BlockSequence: {
              name: "main",
              trialList: _this.AST.trialsPart1,
              start: routines.Block.Start,
              trial: routines.Trial,
              end: routines.Block.End
            }
          },
          4: {
            BlockSequence: {
              name: "main",
              trialList: _this.AST.trialsPart2,
              start: routines.Block.StartMult,
              trial: routines.Trial,
              end: routines.Block.End
            }
          },
          5: routines.Coda,
          6: routines.Save
        };
      };
    })(this)
  };

  this.AST.start = (function(_this) {
    return function(sessionNumber, subjectNumber) {
      var context, design_mul, design_prac, design_sub, listNumber, listOrders, order, orderSeq, separator;
      context = new Psy.createContext();
      if (subjectNumber != null) {
        context.set("active_brain", true);
        context.set("subjectNumber", subjectNumber);
      } else {
        subjectNumber = 1;
        context.set("subjectNumber", subjectNumber);
      }
      if (sessionNumber != null) {
        context.set("sessionNumber", sessionNumber);
      } else {
        sessionNumber = 1;
      }
      console.log("session Number", sessionNumber);
      console.log("subject Number", subjectNumber);
      design_prac = Psy.loadTable("design/AST_Practice.txt", separator = ",");
      listOrders = [[1, 2, 1, 2], [2, 1, 2, 1], [1, 2, 2, 1], [2, 1, 1, 2]];
      order = subjectNumber % 4;
      orderSeq = listOrders[order];
      listNumber = orderSeq[sessionNumber - 1];
      design_sub = Psy.loadTable("design/AST_SubList" + listNumber + ".txt", separator = ",");
      design_mul = Psy.loadTable("design/AST_MulList" + listNumber + ".txt", separator = ",");
      design_sub = design_sub.shuffle();
      design_mul = design_mul.shuffle();
      _this.AST.trialsPart1 = Psy.TrialList.fromBlock(design_sub);
      _this.AST.trialsPart2 = Psy.TrialList.fromBlock(design_mul);
      _this.AST.trialsPractice = Psy.TrialList.fromBlock(design_prac);
      _this.pres = new Psy.Presentation({}, _this.AST.experiment, context);
      return _this.pres.start();
    };
  })(this);

}).call(this);
