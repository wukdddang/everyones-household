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

  function onSubmit(values: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

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
