
const Note = require('../modals/note')


const getAllNotes = (req , res , next)=> {
    const notes = Note.find({})
    .then( notes =>{
    	res.send({notes})
    })
    .catch(err => console.log(err))
}

const getNotesById = async (req , res , next)=> {
    const noteId = req.params.notesId

    let note
    try{
        note =  await Note.findById(noteId)

    } catch (err) {
        console.log(err)
        return next(err)
    }
    if(!note){
        return res.status(404).json("Page Not found :)")
    }
    res.send({note})
}

const likeNote = async (req,res,next) => {
  const {notesId, userId} = req.body

  let note
  try{
    note = await Note.findById(notesId)
  }
  catch(err){
    console.log("note.js line 38", err)
    return next(err)
  }
  if(!note){
    return res.status(404).json("Note not Found :)")
  }
  else{
    let likesArr = note.likes
    let dislikedArr = note.dislikes
    if(likesArr.indexOf(userId) === -1 ){                 //user didn't liked the note earlier
      if(dislikedArr.indexOf(userId) === -1){             //user didn't disliked the note earlier
        likesArr.push(userId)                             //user liked the post
      }
      else{                                               //user disliked the note earlier  
        likesArr.push(userId)                             //user liked the post
        dislikedArr.splice(dislikedArr.indexOf(userId), 1)//user removed from disliked 
      }

    }
    else{                                                 //user liked the post earlier
      likesArr.splice(likesArr.indexOf(userId), 1)        //user removed from liked
    }
    note.likes = likesArr
    note.dislikes = dislikedArr
    try{
      await note.save()
    } catch(err){
      console.log(err)
      return next(err)
    }
    res.status(200).json({note, message: "Liked"})
  }

}
const dislikeNote = async (req,res,next) => {
  const {notesId, userId} = req.body

  let note
  try{
    note = await Note.findById(notesId)
  }
  catch(err){
    console.log("note.js line 38", err)
    return next(err)
  }
  if(!note){
    return res.status(404).json("Note not Found :)")
  }
  else{
    let dislikesArr = note.dislikes
    let likedArr = note.likes
    if(dislikesArr.indexOf(userId) === -1 ){                 //user didn't disliked the note earlier
      if(likedArr.indexOf(userId) === -1){                   //user didn't liked the note earlier
        dislikesArr.push(userId)                             //user disliked the post
      }
      else{                                                  //user liked the note earlier  
        dislikesArr.push(userId)                             //user disliked the post
        likedArr.splice(likedArr.indexOf(userId), 1)         //user removed from liked 
      }

    }
    else{                                                    //user disliked the post earlier
      dislikesArr.splice(dislikesArr.indexOf(userId), 1)     //user removed from disliked
    }
    note.likes = likedArr
    note.dislikes = dislikesArr
    try{
      await note.save()
    } catch(err){
      console.log(err)
      return next(err)
    }
    res.status(200).json({note, message: "Liked"})
  }

}

const clickNote = async (req, res,next) => {
  let note 
  console.log(req.body)
  try{
    note = await Note.findById(req.body.notesId)
  }
  catch(err){
    console.log(err)
    return next(err)
  }
  if(!note){
    return res.status(404).json("Note not found :)")
  }
  else{
    note.clicks = note.clicks  + 1
    
    try{
      await note.save()
    }
    catch(err){
      console.log(err)
      return next(err)
    }
    res.status(200).json({note, message: "Clicked"})
  }
}

const getNotesByCourse = async (req , res , next)=> {
    let note
    try{
        note =  await Note.find({course : req.params.course})
    } catch (err) {
        console.log(err)
        return next(err)
    }
    if(!note){
        return res.status(404).json("Page Not found :)")
    }
    res.send({note})
}
const getNotesBySemester = async (req , res , next)=> {
    let note
    try{
        note =  await Note.find({course : req.params.course , semester: req.params.semester})
    } catch (err) {
        console.log(err)
        return next(err)
    }
    if(!note){
        return res.status(404).json("Page Not found :)")
    }
    res.send({note})
}
const getNotesBySubject = async(req, res, next) => {
  let note
  try{
    note= await Note.find({course: req.params.course , semester : req.params.semester , subject: req.params.subject})
  } catch(err){
    console.log(err)
    return next(err)
  }
  if(!note){
    return res.status(404).json("Page Not found ")
  }
  res.send({note})
}
const getNotesByType = async(req, res, next) => {
  let note
  try{
    note= await Note.find({course: req.params.course , semester : req.params.semester , subject: req.params.subject, ctype: req.params.ctype})
  } catch(err){
    console.log(err)
    return next(err)
  }
  if(!note){
    return res.status(404).json("Page Not found ")
  }
  res.send({note})
}
const createNotes = async (req, res , next) => {
    const newNote = new Note({
      name : req.body.name,
      author : req.body.author,
      semester : req.body.semester,
      link : req.body.link,
      course : req.body.course,
      subject : req.body.subject,
      isreq : req.body.isreq,
      ctype: req.body.ctype,
      likes: [],
      dislikes: [],
      clicks: 0
    })
    try{
        await newNote.save()
    } catch(err){
        console.log(err)
        return next(err)
    }
    res.status(201).json({newNote})
}

const updateNotes = async (req, res, next) => {
  let updateNote;
  try{
      updateNote = await Note.findById(req.params.notesId)
  } catch(err) {
      console.log(err)
      return next(err)
  }
  updateNote.name = req.body.name
  updateNote.author = req.body.author
  updateNote.subject = req.body.subject
  updateNote.isreq = req.body.isreq
  updateNote.semester = req.body.semester
  updateNote.course = req.body.course
  updateNote.ctype = req.body.ctype
  updateNote.link = req.body.link
  try{
    await updateNote.save()
  } catch(err){
    console.log(err)
    return next(err)
  }
  res.status(200).json({updateNote})
}

const deleteNotes = async (req , res , next)=> {
    const noteId = req.params.notesId
    let delNote
    try{
        delNote = await Note.findById(noteId)
    } catch(err) {
        console.log(err)
        return next(err)
    }
    try {
        await delNote.remove()
    } catch(err) {
        console.log(err)
        return next(err)
    }
    res.status(200).json("Deleted")
}

exports.getAllNotes = getAllNotes
exports.getNotesById = getNotesById
exports.createNotes = createNotes
exports.deleteNotes = deleteNotes
exports.getNotesByCourse = getNotesByCourse
exports.getNotesBySemester = getNotesBySemester
exports.getNotesBySubject = getNotesBySubject
exports.getNotesByType = getNotesByType
exports.updateNotes = updateNotes 
exports.likeNote = likeNote 
exports.dislikeNote = dislikeNote 
exports.clickNote = clickNote 
