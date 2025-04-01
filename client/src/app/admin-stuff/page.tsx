'use client'
import { RootState } from '@/src/components/storeProvider/StoreProviderCustom'
import { useDispatch, useSelector } from 'react-redux'
import { setBtnAdd } from '@/src/store/productSlice'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CreateProductValue {
  title: string
  description: string
  price: number
  image?: File | null
  category: string
  characteristics: string
}

const AdminStuff = () => {
  const isBtnAdd = useSelector((state: RootState) => state.product.isBtnAdd)
  const dispatch = useDispatch()
  const router = useRouter()
  const [preview, setPreview] = useState<string | null>(null)

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    category: yup.string().required(),
    characteristics: yup.string().required()
  })

  const { register, handleSubmit, setValue } = useForm<CreateProductValue>(
    { resolver: yupResolver(schema) }
  )


  const onCreateProduct = async (data: CreateProductValue) => {
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("price", data.price.toString())
      formData.append("category", data.category)
      formData.append("characteristics", data.characteristics)

      if (data.image) {
        formData.append("image", data.image)
      }


      await axios.post("http://localhost:8800/sportstuff", formData)
      console.log(data);
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Admin panel</h2>
      <button className='cursor-pointer bg-amber-500' onClick={() => dispatch(setBtnAdd())}>Add product</button>

      {isBtnAdd &&
        <div>
          <form onSubmit={handleSubmit(onCreateProduct)} className='flex flex-col'>
            <input type="text" placeholder='title' {...register('title')} />
            <textarea placeholder='description' {...register('description')} />
            <input type="number" placeholder='price' {...register("price")} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setValue("image", file)
                  setPreview(URL.createObjectURL(file))
                }
              }}
            />
            {preview && <img src={preview} alt="Preview" width={200} />}
            <input type="text" placeholder='category' {...register("category")} />
            <textarea placeholder='characteristics' {...register("characteristics")} />
            <input type="submit" className='cursor-pointer' />
          </form>
        </div>}
    </div>
  )
}

export default AdminStuff