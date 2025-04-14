'use client'
import { RootState } from '@/src/components/storeProvider/StoreProviderCustom'
import { useDispatch, useSelector } from 'react-redux'
import { setBtnAdd } from '@/src/store/productSlice'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { createSportProduct } from '@/src/api/api'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { refreshProducts } from '@/src/services/refreshProducts'
import { deleteProduct } from '@/src/services/deleteProduct'
import ModalEdit from '@/src/components/modal-edit/ModalEdit'

type SizeFields = 'sizeS' | 'sizeM' | 'sizeL' | 'sizeXL' | 'sizeXXL';

export interface CreateProductValue {
  article: string
  section: string
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
  activityLevel: string
}


const AdminStuff = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>([])
  const [openModal, setOpenModal] = useState<boolean>(false);
  const isBtnAdd = useSelector((state: RootState) => state.product.isBtnAdd)
  const products = useSelector((state: RootState) => state.product.products)
  console.log(products);
  const dispatch = useDispatch()
  const router = useRouter()
  const [preview, setPreview] = useState<string | null>(null)

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setOpenModal(true);
  }

  useEffect(() => {
    refreshProducts(dispatch)
  }, [dispatch])

  const schema = yup.object().shape({
    title: yup.string().required(),
    article: yup.string().required(),
    section: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    category: yup.string().required(),
    characteristics: yup.string().required(),
    sizeS: yup.string().optional(),
    sizeM: yup.string().optional(),
    sizeL: yup.string().optional(),
    sizeXL: yup.string().optional(),
    sizeXXL: yup.string().optional(),
    activityLevel: yup.string().optional(),
  }) as yup.ObjectSchema<CreateProductValue>;

  const { register, handleSubmit, setValue } = useForm<CreateProductValue>(
    { resolver: yupResolver(schema) }
  )

  const onCreateProduct = async (data: CreateProductValue) => {
    try {
      const formData = new FormData()
      formData.append("article", data.article)
      formData.append("section", data.section)
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
      formData.append("activityLevel", data.activityLevel)

      if (data.image) {
        formData.append("image", data.image)
      }

      await createSportProduct(formData)
      console.log(data);
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div className='mt-[25px]'>
      <div className="flex items-start flex-col mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
        <button
          onClick={() => dispatch(setBtnAdd())}
          className="cursor-pointer px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200"
        >
          Open adding menu
        </button>
      </div>
      {isBtnAdd &&
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl mb-[35px]">
          <form onSubmit={handleSubmit(onCreateProduct)} className='flex flex-col space-y-4'>
            <label htmlFor="" className="block text-sm font-medium text-gray-700">Article:</label>
            <input type="text" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='article' {...register('article')} />
            <label htmlFor="" className="block text-sm font-medium text-gray-700">Section:</label>
            <input type="text" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='section' {...register('section')} />
            <label htmlFor="" className="block text-sm font-medium text-gray-700">Title:</label>
            <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder='title' {...register('title')} />
            <label htmlFor="" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea placeholder='description' className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register('description')} />
            <label htmlFor="" className="block text-sm font-medium text-gray-700">Price:</label>
            <input type="number" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='price' {...register("price")} />
            <label htmlFor="" className="block text-sm font-medium text-gray-700">Img:</label>
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
              className="mt-1 w-full text-sm text-gray-600 cursor-pointer"
            />
            {preview && <img src={preview} alt="Preview" width={200} className="mt-2 w-48 rounded-lg" />
            }
            <label htmlFor="" className="block text-sm font-medium text-gray-700">Category:</label>
            <input type="text" placeholder='category' {...register("category")} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <label htmlFor="" className="block text-sm font-medium text-gray-700">Characteristics:</label>
            <textarea placeholder='characteristics' {...register("characteristics")} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <label htmlFor="" className="block text-sm font-medium text-gray-700">Вид активності:</label>
            <select className='cursor-pointer' {...register('activityLevel')}>
              <option value="low-activity">Низька активність</option>
              <option value="mid-activity">Середня активність</option>
              <option value="high-activity">Висока активність</option>
            </select>
            <fieldset className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div key={size}>
                  <label className="block text-sm font-medium text-gray-700">Size {size}</label>
                  <input
                    type="text"
                    {...register(`size${size}` as SizeFields)}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </fieldset>
            <div>
              <input
                type="submit"
                value="Create Product"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
              />
            </div>
          </form>
        </div>}
      <div className="overflow-auto">
        <table className="min-w-[1000px] table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {['id', 'article', 'title', 'description', 'price', 'image', 'category', 'characteristics', 'sizeS', 'sizeM', 'sizeL', 'sizeXL', 'sizeXXL', 'activityLevel']?.map((title) => (
                <th key={title} className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">{product.article}</td>
                <td className="border px-4 py-2">{product.section}</td>
                <td className="border px-4 py-2">{product.title}</td>
                <td className="border px-4 py-2 truncate max-w-[200px]">{product.description}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">
                  <img src={product.image} alt="product" className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2 truncate max-w-[200px]">{product.characteristics}</td>
                <td className="border px-4 py-2">{product.sizeS}</td>
                <td className="border px-4 py-2">{product.sizeM}</td>
                <td className="border px-4 py-2">{product.sizeL}</td>
                <td className="border px-4 py-2">{product.sizeXL}</td>
                <td className="border px-4 py-2">{product.sizeXXL}</td>
                <td className="border px-4 py-2">{product.activityLevel}</td>

                <td className="border px-4 py-2">
                  <div className="flex items-center gap-3 justify-center">
                    <RiDeleteBin6Line
                      onClick={() => deleteProduct(product?.id, dispatch)}
                      className="text-red-500 hover:text-red-700 cursor-pointer text-xl transition"
                      title="Видалити"
                    />
                    <MdOutlineModeEdit
                      className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl transition"
                      title="Редагувати"
                      onClick={() => {
                        handleEditClick(product);
                      }}
                    />
                  </div>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
        <ModalEdit selectedProduct={selectedProduct} openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </div>
  )
}

export default AdminStuff