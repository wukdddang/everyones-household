import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Button } from "@/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { toast } from "@/common/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Calendar } from "@/common/components/ui/calendar";
import { Input } from "@/common/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { CATEGORIES, NOTES } from "@/constants";

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
});

const HouseHoldTable = ({ csvData }) => {
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>날짜</TableHead>
              <TableHead>항목</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>수입</TableHead>
              <TableHead>지출</TableHead>
              <TableHead>비고</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {csvData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.날짜}</TableCell>
                <TableCell>{item.항목}</TableCell>
                <TableCell>{item.카테고리}</TableCell>
                <TableCell>{item.수입}</TableCell>
                <TableCell>{item.지출}</TableCell>
                <TableCell>{item.비고}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog>
          <DialogTrigger>
            <Button>내역 추가하기</Button>
          </DialogTrigger>
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>날짜</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>항목</FormLabel>
                      <Input
                        {...field}
                        placeholder="지출 항목을 입력해주세요."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>카테고리</FormLabel>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        placeholder="카테고리를 선택해주세요"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={CATEGORIES.FOOD}>
                            {CATEGORIES.FOOD}
                          </SelectItem>
                          <SelectItem value={CATEGORIES.LIVING}>
                            {CATEGORIES.LIVING}
                          </SelectItem>
                          <SelectItem value={CATEGORIES.BEAUTY}>
                            {CATEGORIES.BEAUTY}
                          </SelectItem>
                          <SelectItem value={CATEGORIES.LECTURE}>
                            {CATEGORIES.LECTURE}
                          </SelectItem>
                          <SelectItem value={CATEGORIES.ENTERTAINMENT}>
                            {CATEGORIES.ENTERTAINMENT}
                          </SelectItem>
                          <SelectItem value={CATEGORIES.INTEREST}>
                            {CATEGORIES.INTEREST}
                          </SelectItem>
                          <SelectItem value={CATEGORIES.SALARY}>
                            {CATEGORIES.SALARY}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비고</FormLabel>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        placeholder="비고를 선택해주세요"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={NOTES.KB_CARD}>
                            {NOTES.KB_CARD}
                          </SelectItem>
                          <SelectItem value={NOTES.HYUNDAI_CARD}>
                            {NOTES.HYUNDAI_CARD}
                          </SelectItem>
                          <SelectItem value={NOTES.IBK_BANK}>
                            {NOTES.IBK_BANK}
                          </SelectItem>
                          <SelectItem value={NOTES.WOORI_BANK}>
                            {NOTES.WOORI_BANK}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>금액</FormLabel>
                      <Input
                        {...field}
                        type="number"
                        placeholder="금액을 입력해주세요."
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  );
};

export default HouseHoldTable;
