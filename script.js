const jsonFilePath = 'students.json';

function fetchStudentData() {
    const studentId = document.getElementById('student_id').value;
    const resultDiv = document.getElementById('result');

    if (!studentId) {
        resultDiv.innerHTML = '<div class="error">Vui lòng nhập số báo danh.</div>';
        return;
    }

    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            const student = data.find(student => student.So_Bao_Danh == studentId);

            if (student) {
                const studentDetails = `
                    <h3>Thông tin thí sinh:</h3>
                    <p><strong>Tên thí sinh:</strong> ${student.Ho_Va_Ten}</p>
                    <p><strong>Ngày sinh:</strong> ${student.Ngay_Sinh}</p>
                    <p><strong>Nơi sinh:</strong> ${student.Noi_Sinh}</p>
                    <p><strong>Trường học:</strong> ${student.Truong_Hoc}</p>
                    <p><strong>Xếp hạng trường:</strong> ${student.Xep_Hang_Truong}</p>
                    <p><strong>Xếp hạng toán khối:</strong> ${student.Xep_Hang_Toan_Khoi}</p>
                    <h3>Điểm các môn:</h3>
                    <p><strong>Toán:</strong> ${student.Toan}   Ngữ Văn: ${student.Ngu_Van}   Vật Lý: ${student.Vat_Ly}   Hóa: ${student.Hoa}   Sinh học: ${student.Sinh_Hoc}   Tiếng Anh: ${student.Tieng_Anh}   Môn chuyên: ${student.Mon_Chuyen}   Ngoại ngữ 2: ${student.Ngoai_Ngu_2}</p>
                `;
                resultDiv.innerHTML = studentDetails;
            } else {
                resultDiv.innerHTML = '<div class="error">Không tìm thấy thí sinh với số báo danh này!</div>';
            }
        })
        .catch(error => {
            resultDiv.innerHTML = '<div class="error">Đã có lỗi xảy ra khi tải dữ liệu!</div>';
        });
}
