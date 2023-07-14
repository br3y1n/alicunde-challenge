import { Button, TextField, List, ListItem } from "@mui/material";
import { FC, useState } from "react";
import { Controller, useForm, FieldValues } from "react-hook-form";

const App: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const [list, setList] = useState<string[]>([]);

  const onSubmit = ({ item: newItem }: FieldValues) => {
    setList((prevVal) => [...prevVal, newItem]);
  };

  const removeItem = (index: number) => {
    setList((prevVal) => {
      const newValue = prevVal.filter(
        (_, currentIndex) => index !== currentIndex
      );

      return newValue;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="item"
          control={control}
          rules={{ required: true, minLength: 2 }}
          render={({ field }) => <TextField {...field} />}
        />

        <Button variant="contained" type="submit" disabled={!isValid}>
          Añadir
        </Button>
      </form>

      <List>
        {list.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => {
              removeItem(index);
            }}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default App;
