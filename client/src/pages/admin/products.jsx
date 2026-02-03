import ImageUpload from "@/components/admin/imageUpload";
import AdminProductTile from "@/components/admin/ProductTile";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialogue, setOpenCreateProductsDialogue] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [imageLoadingState, setImageLoadingState] = useState(false);

  const { productList } = useSelector((state) => state.adminProducts);

  const [currentEditProductId, setCurrentEditProductId] = useState(null);

  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    currentEditProductId !== null
      ? dispatch(
          editProduct({
            id: currentEditProductId,
            formData,
          }),
        ).then((data) => {
          console.log("edit", data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialogue(false);
            setCurrentEditProductId(null);
          }
        })
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setImageFile(null);
              setFormData(initialFormData);
              toast("Product Added Successfully");
              setOpenCreateProductsDialogue(false);
            }
          },
        );
  }

  function handleDelete(id) {
    dispatch(deleteProduct(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList);

  return (
    <Fragment>
      <div
        onClick={() => setOpenCreateProductsDialogue(true)}
        className="w-full mb-5 flex justify-end"
      >
        <Button>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((item) => (
              <AdminProductTile
                key={item.title}
                setCurrentEditProductId={setCurrentEditProductId}
                setOpenCreateProductsDialogue={setOpenCreateProductsDialogue}
                setFormData={setFormData}
                product={item}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialogue}
        onOpenChange={() => {
          setOpenCreateProductsDialogue(false);
          setCurrentEditProductId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditProductId !== null
                ? "Edit Product"
                : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditProductId !== null}
          />
          <div className="py-6">
            <Form
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditProductId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              isButtonDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
