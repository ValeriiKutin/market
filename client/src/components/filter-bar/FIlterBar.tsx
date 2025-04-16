import { categories } from '@/src/data/catalog'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../storeProvider/StoreProviderCustom'
import { setHighSelected, setLowSelected, setMidSelected } from '@/src/store/activityAmountFilterSlise'

interface FilterProps {
  isCatalogUI: boolean
}

const FIlterBar: React.FC<FilterProps> = ({ isCatalogUI }) => {
  const dispatch = useDispatch()
  const highActivityCount = useSelector((state: RootState) => state.activityFilter.highActivityCount)
  const midActivityCount = useSelector((state: RootState) => state.activityFilter.midActivityCount)
  const lowActivityCount = useSelector((state: RootState) => state.activityFilter.lowActivityCount)
  return (
    <div className='fixed'>
      {isCatalogUI && (
        <div className='border-[1px] p-[15px] border-gray-200 rounded-[3px]'>
          {categories?.map((category) => (
            <div key={category?.id}>
              {category?.title?.map((title) => (
                <Link href={title?.link} key={title.link} className='font-light hover:text-red-500 transition-all text-[14px]'>{title?.name}</Link>
              ))}
            </div>
          ))}
          <div className='flex flex-col mt-[15px]'>
            <p>Призначення</p>
            <label>
              <input type="checkbox" className="mr-[7px]" onChange={() => dispatch(setLowSelected())} />
              Низька активність <span>{lowActivityCount}</span>
            </label>
            <label>
              <input type="checkbox" className="mr-[7px]" onChange={() => dispatch(setMidSelected())} />
              Середня активність <span>{midActivityCount}</span>
            </label>
            <label>
              <input type="checkbox" className="mr-[7px]" onChange={() => dispatch(setHighSelected())} />
              Висока активність <span>{highActivityCount}</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export default FIlterBar