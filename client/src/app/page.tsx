'use client'

import { useDispatch, useSelector } from "react-redux";
import BenefitList from "../components/benefitList/BenefitList";
import MainPageBanners from "../components/main-page-banners/MainPageBanners";
import ProductsSlider from "../components/product-slider/ProductsSlider";
import SmallBanners from "../components/small-banners/SmallBanners";
import { RootState } from "../components/storeProvider/StoreProviderCustom";
import { useEffect } from "react";
import { refreshProducts } from "../services/refreshProducts";
import Popup from "../components/popup/Popup";

export default function Home() {
  const products = useSelector((state: RootState) => state.product.products)
  const dispatch = useDispatch()
  useEffect(() => {
    refreshProducts(dispatch)
  }, [dispatch])

  return (
    <section className="flex justify-center items-center flex-col">
      <MainPageBanners />
      <ProductsSlider products={products} sliderTitle={'Новинки'} />
      <SmallBanners />
      <ProductsSlider products={products} sliderTitle={'Хіти продажу'} />
      <ProductsSlider products={products} sliderTitle={'Розпродаж'} />
      <BenefitList />
      <Popup />
    </section>
  );
}