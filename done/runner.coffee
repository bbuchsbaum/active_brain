


_ = Psy._


@Done = {}


@Done.experiment =


  Routines:
    Prelude:
      Events:
        1:
          Text:
            content: ["You are finished!",
                      "Please raise your hand briefly and await further instructions."]
            fontSize: 32
            position: "center"
            origin: "center"
          Next:
            AnyKey: {}

      Coda:
        Events:
          1:
            Text:
              content: ""
              position: "center"
              origin: "center"
            Next:
              Timeout:
                duration: 1000


  Flow: (routines) ->
    1: routines.Prelude
    2: routines.Coda


@Done.start =  (subjectNumber, sessionNumber) =>
  @context = new Psy.createContext()
  @context.set("active_brain", true)
  pres = new Psy.Presentation({}, @Done.experiment, @context)
  pres.start()


