import { Container, Box } from "@material-ui/core";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ItemType } from "../../../app/store/item/itemsSlice";
import { Name } from "../../molecules/forms/Name";
import { Id } from "../../molecules/forms/Id";
import { Mprice } from "../../molecules/forms/Mprice";
import { Lprice } from "../../molecules/forms/Lprice";
import { Img } from "../../molecules/forms/Img";
import { Text } from "../../molecules/forms/Text";
import { Btn } from "../../atoms/Btn";
import { addItem, addE } from "../../../app/store/item/itemsOperation";

interface Props {
  itemsNum: number;
  items: ItemType[];
}

export const AdminItemsForm = ({ itemsNum, items }: Props) => {
  const [imgFile, setImgFile] = useState<File | undefined>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<ItemType>({
    mode: "onBlur",
    defaultValues: {
      id: itemsNum + 1,
      name: "",
      text: "",
      mprice: 0,
      lprice: 0,
      img: "",
    },
  });

  const doAddItem: SubmitHandler<ItemType> = (data) => {
    console.log(data);
    console.log(imgFile);
    addItem(items, data, imgFile!);
    addE();
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <p>商品登録</p>
        <form onSubmit={handleSubmit(doAddItem)}>
          <Id control={control} error={errors.id!} />
          <Name control={control} error={errors.name!} />
          <Text control={control} error={errors.text!} />
          <Mprice control={control} error={errors.mprice!} />
          <Lprice control={control} error={errors.lprice!} />
          <Img
            control={control}
            error={errors.img!}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            setImgFile={setImgFile}
          />
          <Box mt={5} textAlign="center">
            <Btn text="登録" onClk={handleSubmit(doAddItem)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};
