Here is the corrected `script.js` without any comments:

```javascript
let studentData = [];
const jsonFilePath = 'students.json';

function fetchStudentData() {
    const studentId = document.getElementById('student_id').value;
    const resultDiv = document.getElementById('result');

    if (!studentId) {
        resultDiv.innerHTML = '<div class="error">Vui lòng nhập số báo danh.</div>';
        return;
    }

    if (studentData.length === 0) {
        resultDiv.innerHTML = '<div class="loading">Đang tải dữ liệu...</div>';
        fetch(jsonFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('File không tìm thấy hoặc có lỗi trong khi tải dữ liệu');
                }
                return response.json();
            })
            .then(data => {
                studentData = data;
                searchStudent(studentId, resultDiv);
            })
            .catch(error => {
                console.error('Fetch error: ', error);
                resultDiv.innerHTML = '<div class="error">Đã có lỗi xảy ra khi tải dữ liệu!</div>';
            });
    } else {
        searchStudent(studentId, resultDiv);
    }
}

function searchStudent(studentId, resultDiv) {
    const students = studentData.filter(student => student.So_Bao_Danh === parseInt(studentId));

    if (students.length > 0) {
        let studentDetails = students.map(student => {
            return `
                <h3>Thông tin thí sinh (Số báo danh: ${student.So_Bao_Danh}):</h3>
                <p><strong>Tên thí sinh:</strong> ${student.Ho_Va_Ten}</p>
                <p><strong>Ngày sinh:</strong> ${student.Ngay_Sinh}</p>
                <p><strong>Nơi sinh:</strong> ${student.Noi_Sinh}</p>
                <p><strong>Trường học:</strong> ${student.Truong_Hoc}</p>
                <p><strong>Xếp hạng trường:</strong> ${student.Xep_Hang_Truong}</p>
                <p><strong>Xếp hạng toán khối:</strong> ${student.Xep_Hang_Toan_Khoi}</p>
                <h3>Điểm các môn:</h3>
                <p>
                    <strong><b>Toán:</b></strong> ${student.Toan || 'Chưa có điểm'}  
                    <strong><b>Vật Lý:</b></strong> ${student.Vat_Ly || 'Chưa có điểm'}  
                    <strong><b>Hóa:</b></strong> ${student.Hoa || 'Chưa có điểm'}  
                    <strong><b>Ngữ Văn:</b></strong> ${student.Ngu_Van || 'Chưa có điểm'}  
                    <strong><b>Lịch Sử:</b></strong> ${student.Lich_Su || 'Chưa có điểm'}  
                    <strong><b>Địa Lí:</b></strong> ${student.Dia_Li || 'Chưa có điểm'}  
                    <strong><b>Sinh học:</b></strong> ${student.Sinh_Hoc || 'Chưa có điểm'}  
                    <strong><b>Tiếng Anh:</b></strong> ${student.Tieng_Anh || 'Chưa có điểm'}  
                    <strong><b>Môn chuyên:</b></strong> ${student.Mon_Chuyen || 'Chưa có điểm'}  
                    <strong><b>Ngoại ngữ 2:</b></strong> ${student.Ngoai_Ngu_2 || 'Chưa có điểm'}
                </p>
            `;
        }).join("");

        resultDiv.innerHTML = studentDetails;
    } else {
        resultDiv.innerHTML = '<div class="error">Không tìm thấy thí sinh với số báo danh này!</div>';
    }
}
