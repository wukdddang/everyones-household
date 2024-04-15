import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import { Checkbox } from "@/common/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { format } from "date-fns";
import { CATEGORIES, NOTES } from "@/constants";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const HouseHoldAddForm = ({ form, onSubmit }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>내역 추가하기</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                            format(field.value, "yyyy-MM-dd") // 날짜 포맷을 yyyy-MM-dd로 변경
                          ) : (
                            <span>날짜를 선택하세요</span>
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
                  <Input {...field} placeholder="지출 항목을 입력해주세요." />
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

            <FormField
              control={form.control}
              name="fixedExpenditure"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>고정 지출</FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default HouseHoldAddForm;
