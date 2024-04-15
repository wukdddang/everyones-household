import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import { format } from "date-fns";

const HouseHoldTable = ({ csvData }) => {
  // console.log(csvData);
  return (
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
        {csvData && csvData.length > 0 ? (
          csvData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{format(item.formattedDate, "yyyy-MM-dd")}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.income || "-"}</TableCell>
              <TableCell>{item.expense || "-"}</TableCell>
              <TableCell>{item.notes || "-"}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="6">해당 월의 데이터가 없습니다.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default HouseHoldTable;
