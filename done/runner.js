// Generated by CoffeeScript 1.7.1
(function() {
  var _;

  _ = Psy._;

  this.Done = {};

  this.Done.experiment = {
    Routines: {
      Prelude: {
        Events: {
          1: {
            Text: {
              content: ["You are finished!", "Please raise your hand briefly and await further instructions."],
              fontSize: 32,
              position: "center",
              origin: "center"
            },
            Next: {
              AnyKey: {}
            }
          }
        },
        Coda: {
          Events: {
            1: {
              Text: {
                content: "",
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
        }
      }
    },
    Flow: function(routines) {
      return {
        1: routines.Prelude,
        2: routines.Coda
      };
    }
  };

  this.Done.start = (function(_this) {
    return function(subjectNumber, sessionNumber) {
      var pres;
      _this.context = new Psy.createContext();
      _this.context.set("active_brain", true);
      pres = new Psy.Presentation({}, _this.Done.experiment, _this.context);
      return pres.start();
    };
  })(this);

}).call(this);
