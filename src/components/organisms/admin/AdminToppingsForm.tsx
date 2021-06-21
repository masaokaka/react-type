import { Container, Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToppingType } from "../../../app/store/topping/toppingsSlice";
import { Name } from "../../molecules/forms/Name";
import { Id } from "../../molecules/forms/Id";
import { Mprice } from "../../molecules/forms/Mprice";
import { Lprice } from "../../molecules/forms/Lprice";
import { Btn } from "../../atoms/Btn";
import { addTopping } from "../../../app/store/topping/toppingsOperation";

interface Props {
  toppingsNum: number;
  toppings: ToppingType[];
}
export const AdminToppingsForm = ({ toppingsNum, toppings }: Props) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ToppingType>({
    mode: "onBlur",
    defaultValues: {
      id: toppingsNum + 1,
      name: "",
      mprice: 0,
      lprice: 0,
    },
  });

  const doAddTopping: SubmitHandler<ToppingType> = (data) => {
    dispatch(addTopping(toppings, data));
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <p>トッピング登録</p>
        <form onSubmit={handleSubmit(doAddTopping)}>
          <Id control={control} error={errors.id!} />
          <Name control={control} error={errors.name!} />
          <Mprice control={control} error={errors.mprice!} />
          <Lprice control={control} error={errors.lprice!} />
          <Box mt={5} textAlign="center">
            <Btn text="登録" onClk={handleSubmit(doAddTopping)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};
