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
  article: string
  title: string
  description: string
  price: number
  image?: File | null
  category: string
  characteristics: string
  sizeS: string
  sizeM: string
  sizeL: string
  sizeXL: string
  sizeXXL: string
}

const AdminStuff = () => {
  const isBtnAdd = useSelector((state: RootState) => state.product.isBtnAdd)
  const dispatch = useDispatch()
  const router = useRouter()
  const [preview, setPreview] = useState<string | null>(null)

  const schema = yup.object().shape({
    title: yup.string().required(),
    article: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    category: yup.string().required(),
    characteristics: yup.string().required(),
    sizeS: yup.string().optional(),
    sizeM: yup.string().optional(),
    sizeL: yup.string().optional(),
    sizeXL: yup.string().optional(),
    sizeXXL: yup.string().optional(),
  }) as yup.ObjectSchema<CreateProductValue>;

  const { register, handleSubmit, setValue } = useForm<CreateProductValue>(
    { resolver: yupResolver(schema) }
  )

  const onCreateProduct = async (data: CreateProductValue) => {
    try {
      const formData = new FormData()
      formData.append("article", data.article)
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("price", data.price.toString())
      formData.append("category", data.category)
      formData.append("characteristics", data.characteristics)
      formData.append("sizeS", data.sizeS)
      formData.append("sizeM", data.sizeM)
      formData.append("sizeL", data.sizeL)
      formData.append("sizeXL", data.sizeXL)
      formData.append("sizeXXL", data.sizeXXL)

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
            <label htmlFor="">Article:</label>
            <input type="text" placeholder='article' {...register('article')} />
            <label htmlFor="">Title:</label>
            <input type="text" placeholder='title' {...register('title')} />
            <label htmlFor="">Description:</label>
            <textarea placeholder='description' {...register('description')} />
            <label htmlFor="">Price:</label>
            <input type="number" placeholder='price' {...register("price")} />
            <label htmlFor="">Img:</label>
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
            {preview && <img src={preview} alt="Preview" width={200} />
            }
            <label htmlFor="">Category:</label>
            <input type="text" placeholder='category' {...register("category")} />
            <label htmlFor="">Characteristics:</label>
            <textarea placeholder='characteristics' {...register("characteristics")} />
            <div>
              <div>
                <label htmlFor="">Size S:</label>
                <input type="text" {...register('sizeS')} />
              </div>
              <div>
                <label htmlFor="">Size M:</label>
                <input type="text"  {...register('sizeM')} />
              </div>
              <div>
                <label htmlFor="">Size L:</label>
                <input type="text"  {...register('sizeL')} />
              </div>
              <div>
                <label htmlFor="">Size XL:</label>
                <input type="text"  {...register('sizeXL')} />
              </div>
              <div>
                <label htmlFor="">Size XXL:</label>
                <input type="text"  {...register('sizeXXL')} />
              </div>
            </div>
            <input type="submit" className='cursor-pointer' />
          </form>
        </div>}
    </div>
  )
}

export default AdminStuff