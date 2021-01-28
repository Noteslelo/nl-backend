const User = require('../modals/user')

var admin = [
  {
    'role': "Admin",
    'id' : "admin-1",
    'name' : "Admin",
    'email' : "admin@noteslelo.com",
    'password' : "Admin@2020"
  },
  {
    'role': "Intern",
    'id' : "intern-1",
    'name' : "Abhishek",
    'email' : "abhishek@noteslelo.com",
    'password' : "Intern@2020"
  },
  {
    'role': "Intern",
    'id' : "intern-2",
    'name' : "Dilip",
    'email' : "dilip@noteslelo.com",
    'password' : "Intern@2020"
  }
]

const loginAdmin = (req , res , next) => {
    const {email , password} = req.body
    console.log(req.body)
    let filteredAdmin = admin.filter(a => a.email === email)
    console.log("line 31", filteredAdmin)
    if(filteredAdmin.length === 0){
      return res.status(401).json({status: 401, message: "Email not found!"})
    }
    else{
      let filteredAdminPassword = filteredAdmin.filter(fa => fa.password === password)
      console.log("line 37", filteredAdminPassword)
      if(filteredAdminPassword.length === 0){
        return res.status(401).json({status: 401, message: "Pssword not correct!"})
      }
      else{
        return res.status(200).json({status: 200, message: "Loged In", data: filteredAdminPassword[0], token: "K95990NJ17057MN98613KM95606J"})
      }
    }
}

const signUp = async (req , res , next) => {
  console.log(req.body)
  const {name , email , password, course, college,gender, semester, imgUrl} = req.body
  let existingUser
  try{
    existingUser = await User.findOne({email : email})
  }  catch(err){
    console.log(err)
    return next(err)
  }
  if (existingUser){
    console.log("User already existed")
    const err = new Error('User already existed')
    let error ='User already existed'
    next(err)
    return res.json({error})
  }
  const newUser = new User({
    name,
    email,
    password,
    course,
    college,
    gender,
    semester,
    imgUrl
  })
  try {
    await newUser.save()
  } catch(err){
    console.log(err)
    return next(err)
  }
  res.status(201).json({newUser})
}

const login = async (req, res, next) => {
  const {email , password} = req.body
  let existingUser
  try{
    existingUser = await User.findOne({email : email})
  }  catch(err){
    console.log(err)
    return next(err)
  }

  if(!existingUser || existingUser.password !== password){
    const err = new Error("User not found with the given credentials ")
    const error = "User not found with the given credentials "
    next(err)
    return res.json({error})
  }
  res.json({message: "Logged In" , user : existingUser})
}

const socialRegister = async(req, res, next) => {
  const {email , name, password} = req.body
  let existingUser
  try{
    existingUser = await User.findOne({email : email})
  }catch(err){
    console.log(err)
    return next(err)
  }
  if(!existingUser){
    console.log("User Not Found")
    return res.json({user : "false"})
  }
  return res.json({user: existingUser , pass: existingUser.password})
}

const socialLogin = async(req, res, next) => {
  const {name , email , password, course, college, semester,gender,imgUrl} = req.body
  let existingUser
  try{
    existingUser = await User.findOne({email : email})
  }  catch(err){
    console.log(err)
    return next(err)
  }
  if (existingUser){
    console.log("User already existed")
    return res.json({user: existingUser , pass: password})
  }
  const newUser = new User({
    name,
    email,
    password,
    course,
    college,
    semester,
    gender,
    imgUrl
  })
  try {
    await newUser.save()
  } catch(err){
    console.log(err)
    return next(err)
  }
  res.status(201).json({newUser})
}

const editUser = async (req,res,next) => {
  let editedUser 
  try{
    editedUser = await User.findById(req.params.userId)
  } catch(err){
    console.log(err)
    return next(err)
  }

  editedUser.name = req.body.name,
  editedUser.course = req.body.course,
  editedUser.college = req.body.college,
  editedUser.semester = req.body.semester,
  editedUser.gender = req.body.gender

  try{
    await editedUser.save()
  } catch(err){
    console.log(err)
    return next(err)
  }
  res.status(200).json({message:"User Profile Edited", data: editedUser})
}

const deleteUser = async (req , res , next)=> {
    const userId = req.params.userId
    let delUser
    try{
        delUser = await User.findById(userId)
    } catch(err) {
        console.log(err)
        return next(err)
    }
    try {
        await delUser.remove()
    } catch(err) {
        console.log(err)
        return next(err)
    }
    res.status(200).json("Deleted")
}
const getUsers = async (req, res, next) => {
  let users
  try{
    users = await User.find({})
  } catch (error){
    const err= "Fetching User Failed! Try Later "
    next (error)
    return res.json({err})
  }
  res.json({users})
}
exports.login = login
exports.signUp = signUp
exports.deleteUser = deleteUser
exports.getUsers = getUsers
exports.socialLogin= socialLogin
exports.socialRegister = socialRegister
exports.loginAdmin = loginAdmin
exports.editUser = editUser
