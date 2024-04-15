import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Button } from "@/common/components/ui/button";

import { toast } from "@/common/components/ui/use-toast";

import { CATEGORIES } from "@/constants";
import HouseHoldAddForm from "./HouseHoldAddForm";
import HouseHoldTable from "./HouseHoldTable";

const FormSchema = z.object({
  dob: z.date({
    required_error: "날짜를 선택해주세요.",
  }),
  title: z
    .string({
      required_error: "지출 항목을 입력해주세요.",
    })
    .min(3),
  category: z
    .string({
      required_error: "카테고리를 선택해주세요.",
    })
    .refine(
      (value) => {
        return Object.values(CATEGORIES).includes(value);
      },
      {
        message: "카테고리를 선택해주세요.",
      }
    ),
  amount: z.number({
    required_error: "금액을 입력해주세요.",
  }),
  notes: z.string().optional(),
  fixedExpenditure: z.boolean().default(false).optional(),
});

const HouseHold = ({ csvData }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      // const response = await fetch("http://localhost:3000/api/save", {
      const response = await fetch(
        "https://everyones-household-frontend.vercel.app/api/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to save data: ${response.status}`);
      }

      // const result = await response.text();
      // console.log(values);
      toast({
        title: "저장되었습니다.",
        description: "성공적으로 저장되었습니다.",
      });
    } catch (error) {
      toast({
        title: "저장에 실패했습니다.",
        description: error.message,
      });
    }
  };

  // console.log(csvData);

  return (
    <Popover>
      <PopoverTrigger>
        <Button>상세 내역 보기</Button>
      </PopoverTrigger>

      <PopoverContent>
        <HouseHoldTable csvData={csvData} />
        <HouseHoldAddForm form={form} onSubmit={onSubmit} />
      </PopoverContent>
    </Popover>
  );
};

export default HouseHold;
