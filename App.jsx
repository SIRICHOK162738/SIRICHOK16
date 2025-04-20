import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    date: "",
    description: "",
    type: "รายจ่าย",
    amount: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("กำลังบันทึก...");
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbydDINX5_cZ_TviEuOk1OGFSiNDJ7QTyTkRD8Py4pyMv2oEQ9iL4dd08o_S7yx3G2D0/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      setStatus("บันทึกเรียบร้อยแล้ว!");
      setForm({ date: "", description: "", type: "รายจ่าย", amount: "" });
    } catch (err) {
      setStatus("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="container">
      <h2>บันทึกรายรับรายจ่าย</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="text" name="description" placeholder="รายการ" value={form.description} onChange={handleChange} required />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="รายรับ">รายรับ</option>
          <option value="รายจ่าย">รายจ่าย</option>
        </select>
        <input type="number" name="amount" placeholder="จำนวนเงิน" value={form.amount} onChange={handleChange} required />
        <button type="submit">บันทึก</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;
