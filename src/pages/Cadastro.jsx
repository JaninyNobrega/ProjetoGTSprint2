import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Cadastro = () => {
  const [firstname, setFirstName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensagem, setMensagem] = useState('')

  async function handleCadastro(e) {
    e.preventDefault()
    try {
      const resposta = await axios.post("http://localhost:3000/v1/user/register", {firstname, surname, email, password})
      setFirstName('')
      setSurname('')
      setEmail('')
      setPassword('')
      setMensagem (`Usuário ${resposta.data.firstname} Cadastro realizado com sucesso! Você já pode fazer login.`)
            
    } catch (error) {
      setMensagem(error.response?.data?.erro || 'Erro ao cadastrar usuário. Verifique os dados e tente novamente.')
      
    }
  }

  return (
   <>
   <h1 className='text-2xl font-bold text-center p-4 font-mono'>FAÇA SEU CADASTRO 👽​</h1> 
   <form onSubmit={handleCadastro} className='flex flex-col gap-4 w-full sm:w-[50%] md:w-[40%] lg:w-[30%] mx-auto bg-pink-100 p-4 rounded'>
      <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder='Digite seu nome' required value={firstname} className='border p-2 rounded'/>

      <input onChange={(e) => setSurname(e.target.value)} type="text" placeholder='Digite seu sobrenome' required value={surname} className='border p-2 rounded'/>

      <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Digite seu email' required value={email} className='border p-2 rounded'/>
      
      <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Crie sua senha' required value={password} className='border p-2 rounded'/>

      <button type='submit' className='bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition-colors'>Cadastrar</button>
      <p className='text-center text-sm'>Já tem cadastro? <a href="/login" className='text-pink-500 hover:underline'>Faça login 🤖​</a></p>
   </form>
   {mensagem && <p className='text-center text-red-500 mt-4'>{mensagem}</p>}
   </>
  )
}

export default Cadastro