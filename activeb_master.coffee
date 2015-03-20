
@Active_Brain = {}

## task namespaces are: AST, ArrowFlanker, TrailsB, RAT


getSession = ->
  $.ajax(
    url: "/session",
    type: "GET",
    dataType: "application/json"
  )

getSubject =  ->
  $.ajax(
    url: "/subject",
    type: "GET",
    dataType: "application/json"
  )

Active_Brain.teststart = =>
  RAT.start(1, 1).then( -> ArrowFlanker.start(1,1)).then( -> TrailsB.start(1,1)).then(-> AST.start(1,1))

Active_Brain.start = =>
  getSession()
  .then( (session) -> getSubject())
  .then( subject ) ->
    session = session.data.ID
    subject = subject.data.ID
    AST.start(session, subject)
    .then( -> ArrowFlanker.start(session, subject))
    .then( -> TrailsB.start(session, subject))
    .then(-> RAT.start(session, subject))





