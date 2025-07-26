/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateArticleMutation } from "@/redux/features/article/articleApi";
import { useCreateGroundMutation } from "@/redux/features/Ground/groundApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ConfigProvider, Input, message, Select } from "antd";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  mood: z.string().min(1, "Mood is required"),
  bringsYouHere: z.string().min(1, "This field is required"),
  mentalHealthIssue: z.string().min(1, "This field is required"),
  emotionallyOverwhelmed: z.string().min(1, "This field is required"),
  soundName: z.string().min(1, "Sound name is required"),
  authorityName: z.string().min(1, "Authority name is required"),
  time: z.string().min(1, "Time is required"),
  audioFile: z
    .union([z.instanceof(File), z.null()])
    .refine((file) => file !== null, {
      message: "Audio file is required",
    }),
  image: z
    .union([z.instanceof(File), z.null()])
    .refine((file) => file !== null, {
      message: "Image is required",
    }),
});

type FormData = {
  mood: string;
  bringsYouHere: string;
  mentalHealthIssue: string;
  emotionallyOverwhelmed: string;
  soundName: string;
  authorityName: string;
  time: string;
  audioFile: File | null;
  image: File | null;
};

export default function CreateGroundingSoundForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "",
      bringsYouHere: "",
      mentalHealthIssue: "",
      emotionallyOverwhelmed: "",
      soundName: "",
      authorityName: "",
      time: "",
      audioFile: null,
      image: null,
    },
  });

  const formData = watch();

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("audioFile", file);
    }
  };

  const handleRemoveAudio = () => {
    setValue("audioFile", null);
  };

  const handleRemoveImage = () => {
    setValue("image", null);
  };

  const [createGroundMutation] = useCreateGroundMutation();

  const onSubmit = async (data: FormData) => {
    const formDataPayload = new FormData();

    const body = {
      mood: data.mood,
      goal: [data?.bringsYouHere],
      cause: [data?.mentalHealthIssue],
      emotionalReason: [data?.emotionallyOverwhelmed],
      soundName: data.soundName,
      authority: data.authorityName,
      time: data.time,
    };
    formDataPayload.append("bodyData", JSON.stringify(body));

    if (data.audioFile && data.audioFile instanceof File) {
      formDataPayload.append("soundAudioFile", data.audioFile);
    }

    if (data.image && data.image instanceof File) {
      formDataPayload.append("soundImage", data.image);
    }

    const response = await handleAsyncWithToast(async () => {
      return createGroundMutation(formDataPayload);
    }, "Creating grounding sound...");
    if (response?.data?.success) {
      reset();
      router.push("/dashboard/grounding-sound?tab=grounding-sound");
    }
  };

    function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
        if (file) {
            setValue("image", file);
        }
    }

  return (
    <div className="overflow-hidden overflow-y-auto">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00473E",
            colorBgContainer: "white",
          },
        }}
      >
        <div className="p-6 bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Upload new grounding sound
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit as (data: any) => void)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Controller
                    name="mood"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value || undefined}
                        placeholder="Select Mood"
                        status={errors.mood ? "error" : undefined}
                        className="!rounded-none"
                        options={[
                          {
                            value: "HAPPY",
                            label: (
                              <span className="flex items-center gap-2">
                                <p>Happy</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM10.7944 5.6C10.9539 5.59593 11.1126 5.62383 11.2612 5.68207C11.4097 5.74031 11.5451 5.8277 11.6593 5.93909C11.6593 5.93909 11.6593 5.93909 11.6593 5.93909C11.7736 6.05049 11.8643 6.18363 11.9263 6.33066C11.9883 6.4777 12.0202 6.63565 12.0201 6.79521C12.0201 6.95477 11.9881 7.1127 11.926 7.25969C11.8639 7.40669 11.7731 7.53977 11.6588 7.65108C11.5444 7.7624 11.409 7.8497 11.2604 7.90784C11.1118 7.96598 10.9531 7.99378 10.7936 7.9896C10.4821 7.98144 10.1861 7.85192 9.96864 7.62866C9.75123 7.40539 9.62961 7.10604 9.62972 6.79441C9.62982 6.48278 9.75164 6.18351 9.9692 5.96039C10.1868 5.73728 10.4829 5.60796 10.7944 5.6ZM5.2 5.6C5.35764 5.60005 5.51372 5.63115 5.65934 5.69153C5.80496 5.7519 5.93726 5.84037 6.04869 5.95187C6.16012 6.06338 6.2485 6.19574 6.30878 6.3414C6.36906 6.48706 6.40005 6.64316 6.4 6.8008C6.39995 6.95844 6.36885 7.11452 6.30847 7.26014C6.2481 7.40576 6.15963 7.53806 6.04813 7.64949C5.93662 7.76092 5.80426 7.8493 5.6586 7.90958C5.51294 7.96986 5.35684 8.00085 5.1992 8.0008C4.88083 8.00069 4.57555 7.87412 4.35051 7.64893C4.12546 7.42373 3.99909 7.11837 3.9992 6.8C3.99931 6.48163 4.12588 6.17635 4.35107 5.95131C4.57627 5.72626 4.88163 5.59989 5.2 5.6ZM8 12.8C4.8 12.8 4 9.6 4 9.6H12C12 9.6 11.2 12.8 8 12.8Z"
                                    fill="#E49E27"
                                  />
                                </svg>
                              </span>
                            ),
                          },
                          {
                            value: "NORMAL",
                            label: (
                              <span className="flex items-center gap-2">
                                <p>Normal</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16ZM4.8 9.6V11.2H11.2V9.6H4.8ZM4.8 7.2C5.11826 7.2 5.42348 7.07357 5.64853 6.84853C5.87357 6.62348 6 6.31826 6 6C6 5.68174 5.87357 5.37652 5.64853 5.15147C5.42348 4.92643 5.11826 4.8 4.8 4.8C4.48174 4.8 4.17652 4.92643 3.95147 5.15147C3.72643 5.37652 3.6 5.68174 3.6 6C3.6 6.31826 3.72643 6.62348 3.95147 6.84853C4.17652 7.07357 4.48174 7.2 4.8 7.2ZM11.2 7.2C11.5183 7.2 11.8235 7.07357 12.0485 6.84853C12.2736 6.62348 12.4 6.31826 12.4 6C12.4 5.68174 12.2736 5.37652 12.0485 5.15147C11.8235 4.92643 11.5183 4.8 11.2 4.8C10.8817 4.8 10.5765 4.92643 10.3515 5.15147C10.1264 5.37652 10 5.68174 10 6C10 6.31826 10.1264 6.62348 10.3515 6.84853C10.5765 7.07357 10.8817 7.2 11.2 7.2Z"
                                    fill="#E46927"
                                  />
                                </svg>
                              </span>
                            ),
                          },
                          {
                            value: "SAD",
                            label: (
                              <span className="flex items-center gap-2">
                                <p>Sad</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM4 6.8C4.00011 6.48163 4.12668 6.17635 4.35187 5.95131C4.46338 5.83988 4.59574 5.7515 4.7414 5.69122C4.88706 5.63094 5.04316 5.59995 5.2008 5.6C5.35844 5.60005 5.51452 5.63115 5.66014 5.69153C5.80576 5.7519 5.93806 5.84037 6.04949 5.95187C6.16092 6.06338 6.2493 6.19574 6.30958 6.3414C6.36986 6.48706 6.40085 6.64316 6.4008 6.8008C6.40069 7.11917 6.27412 7.42445 6.04893 7.64949C5.82373 7.87454 5.51837 8.00091 5.2 8.0008C4.88163 8.00069 4.57635 7.87412 4.35131 7.64893C4.12626 7.42373 3.99989 7.11837 4 6.8ZM4.8 12C4.8 12 5.6 9.6 8 9.6C10.4 9.6 11.2 12 11.2 12H4.8ZM10.7944 7.9888C10.6349 7.99287 10.4762 7.96497 10.3276 7.90673C10.1791 7.84849 10.0437 7.7611 9.92947 7.64971C9.81523 7.53831 9.72445 7.40517 9.66249 7.25814C9.60053 7.1111 9.56863 6.95315 9.56868 6.79359C9.56874 6.63403 9.60074 6.4761 9.6628 6.32911C9.72486 6.18211 9.81573 6.04903 9.93004 5.93772C10.0444 5.8264 10.1798 5.7391 10.3284 5.68096C10.477 5.62282 10.6357 5.59502 10.7952 5.5992C11.1067 5.60737 11.4027 5.73688 11.6202 5.96014C11.8376 6.18341 11.9592 6.48276 11.9591 6.79439C11.959 7.10602 11.8372 7.40529 11.6196 7.62841C11.402 7.85152 11.1059 7.98084 10.7944 7.9888Z"
                                    fill="#336C65"
                                  />
                                </svg>
                              </span>
                            ),
                          },
                          {
                            value: "DEPRESSED",
                            label: (
                              <span className="flex items-center gap-2">
                                <p>Depressed</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M8 16C3.58182 16 0 12.4182 0 8C0 3.58182 3.58182 0 8 0C12.4182 0 16 3.58182 16 8C16 12.4182 12.4182 16 8 16ZM4.19564 7.90255L6.71491 6.448L5.98764 5.18836L3.46836 6.64291L4.19564 7.90255ZM12.5331 6.64291L10.0138 5.18836L9.28654 6.448L11.8058 7.90255L12.5331 6.64291ZM8 8.72727C7.3617 8.72729 6.73465 8.89532 6.18187 9.21448C5.62909 9.53363 5.17006 9.99267 4.85091 10.5455L4.48655 11.1745L5.74473 11.9025L6.10982 11.2727C6.48727 10.6189 7.19273 10.1818 8 10.1818C8.80727 10.1818 9.512 10.6189 9.89091 11.2727L10.2545 11.9025L11.5135 11.1745L11.1498 10.5447C10.8305 9.99197 10.3713 9.53301 9.81842 9.21398C9.2655 8.89495 8.63835 8.72709 8 8.72727Z"
                                    fill="#858887"
                                  />
                                </svg>
                              </span>
                            ),
                          },
                        ]}
                        style={{ width: "100%" }}
                        size="large"
                      />
                    )}
                  />
                  {errors.mood && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.mood.message}
                    </p>
                  )}
                </div>

                <div>
                  <Controller
                    name="bringsYouHere"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value || undefined}
                        placeholder="What brings you here..."
                        status={errors.bringsYouHere ? "error" : undefined}
                        options={[
                          { value: "MANAGE_ANXIETY", label: "Manage anxiety" },
                          { value: "REDUCE_STRESS", label: "Reduce stress" },
                          { value: "IMPROVE_MOOD", label: "Improve mood" },
                          {
                            value: "JOIN_COMMUNITY",
                            label: "Join your community",
                          },
                          { value: "IMPROVE_SLEEP", label: "Improve sleep" },
                          {
                            value: "BOOST_CONFIDENCE",
                            label: "Boost confidence",
                          },
                          { value: "OTHER", label: "Other" },
                        ]}
                        style={{ width: "100%" }}
                        size="large"
                      />
                    )}
                  />
                  {errors.bringsYouHere && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.bringsYouHere.message}
                    </p>
                  )}
                </div>

                <div>
                  <Controller
                    name="mentalHealthIssue"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value || undefined}
                        placeholder="What causes your mental health issue?"
                        status={errors.mentalHealthIssue ? "error" : undefined}
                        options={[
                          {
                            value: "RELATIONSHIP_ISSUE",
                            label: "Relationship issue",
                          },
                          {
                            value: "FINANCIAL_STRESS",
                            label: "Financial stress",
                          },
                          { value: "HEALTH_CONCERN", label: "Health concern" },
                          {
                            value: "CHANGING_LIFESTYLE",
                            label: "Changing lifestyle",
                          },
                          {
                            value: "CIVILIAN_LIFE_ADJUSTMENT",
                            label: "Civilian life adjustment",
                          },
                          { value: "ISOLATION", label: "Isolation" },
                          { value: "OTHER", label: "Other" },
                        ]}
                        style={{ width: "100%" }}
                        size="large"
                      />
                    )}
                  />
                  {errors.mentalHealthIssue && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.mentalHealthIssue.message}
                    </p>
                  )}
                </div>

                <div>
                  <Controller
                    name="emotionallyOverwhelmed"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value || undefined}
                        placeholder="What's make you feel emotionally overwhelmed?"
                        status={
                          errors.emotionallyOverwhelmed ? "error" : undefined
                        }
                        options={[
                          {
                            value: "FLASHBACKS_OR_INTRUSIVE_THOUGHTS",
                            label: "Flashbacks or intrusive thoughts",
                          },
                          {
                            value: "FEELING_MISUNDERSTOOD_OR_JUDGED",
                            label: "Feeling misunderstood or judged",
                          },
                          {
                            value: "POOR_SLEEP_OR_NIGHTMARES",
                            label: "Poor sleep or nightmares",
                          },
                          {
                            value: "ANEXIETY_FOR_NO_CLEAR_REASON",
                            label: "Anxiety for no clear reason",
                          },
                          {
                            value: "GUILT_OVER_PAST_DECISIONS",
                            label: "Guilt over past decisions",
                          },
                          {
                            value: "LACK_OF_EMOTIONAL_SUPPORT",
                            label: "Lack of emotional support",
                          },
                          { value: "OTHER", label: "Other" },
                        ]}
                        style={{ width: "100%" }}
                        size="large"
                      />
                    )}
                  />
                  {errors.emotionallyOverwhelmed && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.emotionallyOverwhelmed.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Controller
                    name="soundName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Write sound name here..."
                        status={errors.soundName ? "error" : undefined}
                        size="large"
                      />
                    )}
                  />
                  {errors.soundName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.soundName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Controller
                    name="authorityName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Write authority name here..."
                        status={errors.authorityName ? "error" : undefined}
                        size="large"
                      />
                    )}
                  />
                  {errors.authorityName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.authorityName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Write time here..."
                        status={errors.time ? "error" : undefined}
                        size="large"
                      />
                    )}
                  />
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.time.message}
                    </p>
                  )}
                </div>

                {/* Upload Audio and Image */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Audio Upload */}
                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors relative">
                      {formData.audioFile ? (
                        <div className="text-sm text-gray-600">
                          <button
                            type="button"
                            onClick={handleRemoveAudio}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                          >
                            <X className="h-4 w-4 text-red-600 cursor-pointer" />
                          </button>
                          <p className="font-medium">{formData.audioFile.name}</p>
                          <p className="text-xs">Audio uploaded</p>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={handleAudioUpload}
                            className="hidden"
                            id="audio-upload"
                          />
                          <label
                            htmlFor="audio-upload"
                            className="cursor-pointer"
                          >
                            <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Upload Audio</p>
                          </label>
                        </>
                      )}
                    </div>
                    {errors.audioFile && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.audioFile.message}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors relative">
                      {formData.image ? (
                        <div className="text-sm text-gray-600">
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                          >
                            <X className="h-4 w-4 text-red-600 cursor-pointer" />
                          </button>
                          <p className="font-medium">{formData.image.name}</p>
                          <p className="text-xs">Image uploaded</p>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Upload Image</p>
                          </label>
                        </>
                      )}
                    </div>
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-md text-base font-medium h-auto"
                  size="large"
                >
                  Add Grounding sound
                </Button>
              </div>
            </div>
          </form>
        </div>
      </ConfigProvider>
    </div>
  );
}