'use client'
import { editProduct } from "@/src/services/editProduct";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ModalEdit = ({ selectedProduct, openModal, setOpenModal }: any) => {
  const [article, setArticle] = useState(selectedProduct?.article);
  const [title, setTitle] = useState(selectedProduct?.title);
  const [price, setPrice] = useState(selectedProduct?.price);
  const [image, setImage] = useState(selectedProduct?.image);
  const [category, setCategory] = useState(selectedProduct?.category);
  const [characteristics, setCharacteristics] = useState(selectedProduct?.characteristics);
  const [sizeS, setSizeS] = useState(selectedProduct?.sizeS);
  const [sizeM, setSizeM] = useState(selectedProduct?.sizeM);
  const [sizeL, setSizeL] = useState(selectedProduct?.sizeL);
  const [sizeXL, setSizeXL] = useState(selectedProduct?.sizeXL);
  const [sizeXXL, setSizeXXL] = useState(selectedProduct?.sizeXXL);
  const [activityLevel, setActivityLevel] = useState(selectedProduct?.activityLevel);

  const dispatch = useDispatch()

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    const updatedProduct = {
      article: article,
      title: title,
      price: price,
      image: image,
      category: category,
      characteristics: characteristics,
      sizeS: sizeS,
      sizeM: sizeM,
      sizeL: sizeL,
      sizeXL: sizeXL,
      sizeXXL: sizeXXL,
      activityLevel: activityLevel,
    };
    try {
      await editProduct(selectedProduct.id, updatedProduct, dispatch);
      setOpenModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  useEffect(() => {
    // Оновлює стан, коли selectedProduct змінюється
    setArticle(selectedProduct?.article || '');
    setTitle(selectedProduct?.title || '');
    setPrice(selectedProduct?.price || '');
    setImage(selectedProduct?.image || '');
    setCategory(selectedProduct?.category || '');
    setCharacteristics(selectedProduct?.characteristics || '');
    setSizeS(selectedProduct?.sizeS || '');
    setSizeM(selectedProduct?.sizeM || '');
    setSizeL(selectedProduct?.sizeL || '');
    setSizeXL(selectedProduct?.sizeXL || '');
    setSizeXXL(selectedProduct?.sizeXXL || '');
    setActivityLevel(selectedProduct?.activityLevel || '');
  }, [selectedProduct]);

  return (
    <>
      {openModal && (
        <div className='flex h-[100dvh] w-[100%] items-center justify-center absolute top-0 left-0 z-[7] bg-gray-400/50'>
          <dialog className="rounded-lg p-6 shadow-lg w-[400px] relative z-10" open>
            <form onSubmit={handleSubmitEdit} method="dialog" className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Редагування</h2>
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={article} onChange={(e) => setArticle(e.target.value)} />
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={price} onChange={(e) => setPrice(e.target.value)} />
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={image} onChange={(e) => setImage(e.target.value)} />
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)} />
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={characteristics} onChange={(e) => setCharacteristics(e.target.value)} />
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={sizeS} onChange={(e) => setSizeS(e.target.value)} />
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={sizeM} onChange={(e) => setSizeM(e.target.value)} />
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={sizeL} onChange={(e) => setSizeL(e.target.value)} />
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={sizeXL} onChange={(e) => setSizeXL(e.target.value)} />
              <input type="text" placeholder="Назва товару" className="border px-3 py-2 rounded" value={sizeXXL} onChange={(e) => setSizeXXL(e.target.value)} />
              <label htmlFor="" className="block text-sm font-medium text-gray-700">Вид активності:</label>
              <select className='cursor-pointer' onChange={(e) => setActivityLevel(e.target.value)} value={activityLevel}>
                <option value="low-activity" >Низька активність</option>
                <option value="mid-activity" >Середня активність</option>
                <option value="high-activity" >Висока активність</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Закрити
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Зберегти
                </button>
              </div>
            </form>
          </dialog>
        </div>

      )}
    </>
  )
}

export default ModalEdit;