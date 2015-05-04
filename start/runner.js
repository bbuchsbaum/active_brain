// Generated by CoffeeScript 1.7.1
(function() {
  var _;

  _ = Psy._;

  this.Start = {};

  this.Start.experiment = {
    Routines: {
      Prelude: {
        Events: {
          1: {
            Markdown: "Welcome!\n==========================\n\nYou will be performing a series of cognitive tasks.\n\nPlease follow the directions on the screen as you go.\n\nWhen you're ready to start, **press any key**\n",
            Next: {
              AnyKey: {}
            }
          }
        }
      }
    },
    Flow: function(routines) {
      return {
        1: routines.Prelude
      };
    }
  };

  this.Start.start = (function(_this) {
    return function(subjectNumber, sessionNumber) {
      var pres;
      _this.context = new Psy.createContext();
      _this.context.set("active_brain", true);
      pres = new Psy.Presentation({}, window.Start.experiment, context);
      return pres.start();
    };
  })(this);

}).call(this);

//# sourceMappingURL=runner.map