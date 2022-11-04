import React from "react";

// 利用したい MUI コンポーネントを import
import {
  Box,
  Button,
  Container,
  TextField,
  Stack,
  IconButton
} from "@mui/material";

// 利用したい React Hook Form のフックをimport
import { useForm, useFieldArray } from "react-hook-form";
import {
  Add as AddIcon,
  DeleteOutline as DeleteOutlineIcon
} from "@mui/icons-material";

// React Hook Form でエラーメッセージを表示するための ErrorMessage コンポーネントを import
import { ErrorMessage } from "@hookform/error-message";

// 計算結果を表示させる TotalAmount コンポーネントをimport
type FormValues = {
  works: {
    title: string;
    url: string
    summary?: string
    duration?: string
    number_of_people?: number;
    language?: string
    role?: string
    brief_story?: string
    image_url?: string
    //id: string
  }[];
};

export const WorkForm = (): JSX.Element => {
  const {
    // register 関数はinput/select の Ref とバリデーションルールを React Hook Form に登録 (register)
    register,

    // reset 関数はフォーム内のフィールドの値とエラーをリセットできる
    reset,
    control,

    // handleSubmit 関数はバリデーションに成功するとフォームデータを渡す
    handleSubmit,

    // errors オブジェクトには、各 input のフォームのエラーまたはエラーメッセージが含まれる
    // バリデーションとエラーメッセージで登録するとエラーメッセージが返される
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      works: [{
        title: "kaito",
        url: "tko",
        summary: "ko",
        duration: "wgaea",
        number_of_people: 1,
        language: "awea",
        role: "gawea",
        brief_story: "wagea",
        image_url: "bawea",
      },
        {
          title: "kaito",
          url: "tko",
          summary: "ko",
          duration: "wgaea",
          number_of_people: 1,
          language: "awea",
          role: "gawea",
          brief_story: "wagea",
          image_url: "bawea",
        },
      ]
    },

    // blur イベントからバリデーションがトリガーされる
    mode: "onBlur"
  });

  // useFieldArray に name と control を渡すことで、MUI の TextField への入力値を取得できるようになる
  const { fields, append, remove } = useFieldArray({
    name: "works",
    control
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Container maxWidth="sm" sx={{ pt: 5, bgcolor: '#fff' }}>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          return (
            <React.Fragment key={field.id}>
              <TextField
                sx={{ mr: 2, flex: 3 }}
                size="small"
                label="タイトル"
                {...register(`works.${index}.title`, {
                  required: true
                })}
              />
              <Box color="error.main" fontSize={12}>
                <ErrorMessage
                  errors={errors}
                  name={`works.${index}.title`}
                  as="p"
                  message="⚠ タイトルを入力してください"
                />
              </Box>

              <TextField
                sx={{ mr: 2, flex: 3 }}
                size="small"
                label="開発期間"
                {...register(`works.${index}.duration`)}
              />

              <TextField
                sx={{ mr: 1, flex: 1 }}
                size="small"
                type="number"
                label="開発人数"
                {...register(`works.${index}.number_of_people`, {
                  // input が受け付ける最小文字数と最大文字数を設定
                  min: 1,
                  max: 100
                })}
              />
              <Box color="error.main" fontSize={12}>
                <ErrorMessage
                  errors={errors}
                  name={`works.${index}.image_url`}
                  as="p"
                  message="⚠ 数量欄に1~100の数字を入力してください"
                />
              </Box>

              <TextField
                sx={{ mr: 2, flex: 3 }}
                size="small"
                label="開発言語"
                {...register(`works.${index}.language`)}
              />

              <TextField
                sx={{ mr: 2, flex: 3 }}
                size="small"
                label="役割"
                {...register(`works.${index}.role`)}
              />

              <TextField
                sx={{ mr: 2, flex: 3 }}
                size="small"
                label="URL"
                {...register(`works.${index}.url`, {
                  required: true
                })}
              />

              <TextField
                sx={{ mr: 2, flex: 3 }}
                size="small"
                label="小話"
                {...register(`works.${index}.brief_story`)}
              />


              <TextField
                sx={{ mr: 2, flex: 3 }}
                size="small"
                label="画像"
                {...register(`works.${index}.image_url`)}
              />
              <Box color="error.main" fontSize={12}>
                <ErrorMessage
                  errors={errors}
                  name={`works.${index}.image_url`}
                  as="p"
                  message="⚠ タイトルを入力してください"
                />
              </Box>

                {/* remove 関数は特定の位置の input を削除、位置を指定しない場合は全てを削除 */}
                <IconButton aria-label="delete" onClick={() => remove(index)}>
                  <DeleteOutlineIcon />
                </IconButton>
              <Box color="error.main" fontSize={12}>
                {/* ErrorMessage コンポーネントは name 属性で関連付けされた入力のエラーメッセージを表示するためのシンプルなコンポーネント */}
                <ErrorMessage
                  errors={errors}
                  name={`works.${index}.quantity`}
                  message="⚠ 数量欄に1~100の数字を入力してください"
                  as="p"
                />
              </Box>
            </React.Fragment>
          );
        })}
      </Stack>
      <Button

        sx={{ mt: 1 }}
        startIcon={<AddIcon />}
        // append 関数はフィールドの最後に input を追加する
        onClick={() =>
          append({
            title: "",
            url: "",
            summary: "",
            duration: "",
            number_of_people: 0,
            language: "",
            role: "",
            brief_story: "",
            image_url: "",
          })
        }
      >
        行を追加する
      </Button>
      <Box textAlign="center" mt={2}>
        <Button
          variant="outlined"
          sx={{ mr: 1 }}
          onClick={() =>
            reset({
              works: [{
                title: "",
                url: "",
                summary: "",
                duration: "",
                number_of_people: 0,
                language: "",
                role: "",
                brief_story: "",
                image_url: "",
              }]
            })
          }
        >
          リセット
        </Button>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          // submit イベントからバリデーションがトリガーされる
          onClick={handleSubmit(onSubmit)}
        >
          送信
        </Button>
      </Box>
    </Container>
  );
};
