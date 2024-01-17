const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { findByEmail, create } = require('../models/users')
const commonHelper = require('../helper/common')
const jwt = require('jsonwebtoken')
const authHelper = require('../helper/auth')

const register = async (req, res, next) => {
  try {
    const { email, password, fullname } = req.body
    const { rowCount } = await findByEmail(email)
    // console.log(rowCount);
    const salt = bcrypt.genSaltSync(10)
    const passwrodHash = bcrypt.hashSync(password, salt)
    console.log(passwrodHash)

    // USER1 = '2sdfasdf'
    // password =abc123+2sdfasdf -> 123123sddsfa3edfs
    // USER2 =
    // password =abc123+123sdf34  -> 123123sddsf234sdfsdf

    if (rowCount) {
      // return next(createError(403, 'user sudah terdaftar'))
    }
    const data = {
      id: uuidv4(),
      email,
      password: passwrodHash,
      fullname,
      role: 'user'
    }
    await create(data)
    commonHelper.response(res, null, 201, 'user berhasil resgiter')
  } catch (error) {
    console.log(error)

  }
}
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { rows: [user] } = await findByEmail(email)
    // const user = rows[0]
    if (!user) {
      return commonHelper.response(res, null, 403, 'email atau password anda salah')
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return commonHelper.response(res, null, 403, 'email atau password anda salah')
    }
    delete user.password

    const payload = {
      email: user.email,
      role: user.role
    }
    // generate token
    user.token = authHelper.generateToken(payload)
    // generate Refresh Token
    user.refreshToken = authHelper.generateRefreshToken(payload)

    commonHelper.response(res, user, 201, 'anda berhasil login')
  } catch (error) {
    console.log(error)
    // next(new createError.InternalServerError())
  }
}
const profile = async(req, res, next)=>{
  const email = req.decoded.email
  const {rows: [user]} = await findByEmail(email)
  delete user.password
  commonHelper.response(res, user, 200)
}
const deleteUser = async(req, res, next) =>{

}

const refreshToken = (req, res, next) =>{
  const resfreshToken = req.body.refreshToken
  const decode = jwt.decode(resfreshToken, process.env.SECRET_KEY_JWT)
  const payload = {
    email: decode.email,
    role: decode.role
  }
  const result = {
    token: authHelper.generateToken(payload),
    resfreshToken: authHelper.generateRefreshToken(payload)
  }
  commonHelper.response(res, result, 200)
}
module.exports = {
  register,
  login,
  profile,
  deleteUser,
  refreshToken
}
