import type { Id } from "@/convex/_generated/dataModel";

interface Props {
  isSubmitting: boolean;
  image: string;
  imagePrompt: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setImagePrompt: React.Dispatch<React.SetStateAction<string>>;
  setImageStorageId: React.Dispatch<
    React.SetStateAction<Id<"_storage"> | null>
  >;
}

export const GenerateThumbnail = ({
  isSubmitting,
  image,
  imagePrompt,
  setImage,
  setImagePrompt,
  setImageStorageId,
}: Props) => {
  return null;
};
