import CreateRecruitForm from "@/components/molecules/recruits/CreateRecruitForm";


// 募集作成ページ
const CreateRecruitPage = () => {
  // const router = useRouter();
  // // プレビューかどうかの状態管理をするステート
  // const [isPreview, setIsPreview] = useState(false);

  // // フォームの状態管理をするステート
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   watch,
  //   control,
  //   formState: { isSubmitting, errors },
  // } = useForm<z.infer<typeof createRecruitSchema>>({
  //   resolver: zodResolver(createRecruitSchema),
  //   defaultValues: {
  //     title: "",
  //     content: "",
  //     isPublished: false,
  //     repositoryUrl: "",
  //   },
  // });

  // const title = watch("title");
  // const content = watch("content");
  // const repositoryUrl = watch("repositoryUrl");

  // // 募集作成関数
  // const onSubmit = async (data: {
  //   title: string;
  //   content: string;
  //   isPublished: boolean;
  //   repositoryUrl?: string;
  // }) => {
  //   try {
  //     const res = await createRecruit(data);

  //     if (res) {
  //       toast.success("募集を作成しました", { icon: "🎉" });
  //       router.push("/dashboard/recruits");
  //       router.refresh();
  //     }
  //   } catch (error) {
  //     toast.error("エラーが発生しました", { icon: "❌" });
  //   }
  // };
  // const onError = () => {
  //   // バリデーションエラーを全て取得して表示
  //   Object.values(errors).forEach((error) => {
  //     if (error?.message) {
  //       toast.error(error.message, { icon: "⚠️" });
  //     }
  //   });
  // };

  // // マークダウンエディター内のカーソル位置を保持するためのRef
  // const cursorPositionRef = useRef<number>(0);

  // // カーソルの位置に画像のパスを挿入する関数
  // const insertTextToContent = (text: string) => {
  //   // 現在の content を取得
  //   const currentContent = watch("content");

  //   // カーソル位置を基準にして、カーソル位置前後の文字列を取得
  //   const before = currentContent.slice(0, cursorPositionRef.current);
  //   const after = currentContent.slice(cursorPositionRef.current);

  //   // 画像パス挿入後の新しいコンテンツを作成
  //   const newContent = `${before}${text}${after}`;

  //   setValue("content", newContent);
  // };

  // // マークダウンエディターのカーソル位置を取得する関数
  // const handleCursorChange = (
  //   event:
  //     | React.MouseEvent<HTMLTextAreaElement>
  //     | React.KeyboardEvent<HTMLTextAreaElement>,
  // ) => {
  //   const textarea = event.target as HTMLTextAreaElement;
  //   cursorPositionRef.current = textarea.selectionStart;
  // };

  // // 画像をCloudinaryに保存し、パスをcontentに追加する関数
  // const onInsertImage = (name: string, url: string) => {
  //   const imageLink = `\n![${name}](${url})\n`;
  //   insertTextToContent(imageLink);
  // };

  return (
    <div className="bg-slate-100 w-full">
      <div className="max-w-[960px] mx-auto sm:p-8 p-2 container">
        {/* ここ別のコンポーネントにできるよね */}
        <CreateRecruitForm />
      </div>
    </div>
  );
};

export default CreateRecruitPage;
