
@Active_Brain = {}

## task namespaces are: AST, ArrowFlanker, TrailsB, RAT


getSession = ->
  $.getJSON( "/session")

getSubject =  ->
  $.getJSON( "/subject")

Active_Brain.teststart = =>
  RAT.start(1, 1).then( -> ArrowFlanker.start(1,1)).then( -> TrailsB.start(1,1)).then(-> AST.start(1,1))

Active_Brain.start = =>
  getSession()
  .then( (session) ->
    window._session = session.data.ID
    getSubject())
  .then( (subject ) ->
    window._subject = subject.data.ID
    AST.start(window._session, window._subject)
    .then( -> ArrowFlanker.start(window._session, window._subject))
    .then( -> TrailsB.start(window._session, window._subject))
    .then(-> RAT.start(window._session, window._subject)))






