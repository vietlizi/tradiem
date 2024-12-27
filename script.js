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
    const students = studentData.filter(student => student.SBD === parseInt(studentId));

    if (students.length > 0) {
        let studentDetails = students.map(student => {
            return `
                <h3>Thông tin thí sinh (Số báo danh: ${student.SBD}):</h3>
                <p><strong>Tên thí sinh:</strong> ${student.HoVaTen}</p>
                <p><strong>Ngày sinh:</strong> ${student.NgaySinh}</p>
                <p><strong>Nơi sinh:</strong> ${student.NoiSinh}</p>
                <p><strong>Trường học:</strong> ${student.TruongHoc}</p>
                <p><strong>Xếp hạng trường:</strong> ${student.XepHangTruong}</p>
                <p><strong>Xếp hạng toán khối:</strong> ${student.XepHangToanKhoi}</p>
                <h3>Điểm các môn:</h3>
                <p>
                    <strong><b>Toán:</b></strong> ${student.Toan || 'Chưa có điểm'}  
                    <strong><b>Vật Lý:</b></strong> ${student.VatLy || 'Chưa có điểm'}  
                    <strong><b>Hóa:</b></strong> ${student.HoaHoc || 'Chưa có điểm'}  
                    <strong><b>Ngữ Văn:</b></strong> ${student.NguVan || 'Chưa có điểm'}  
                    <strong><b>Lịch Sử:</b></strong> ${student.LichSu || 'Chưa có điểm'}  
                    <strong><b>Địa Lí:</b></strong> ${student.DiaLi || 'Chưa có điểm'}  
                    <strong><b>Sinh học:</b></strong> ${student.SinhHoc || 'Chưa có điểm'}  
                    <strong><b>Tiếng Anh:</b></strong> ${student.TiengAnh || 'Chưa có điểm'}  
                    <strong><b>Môn chuyên:</b></strong> ${student.MonChuyen || 'Chưa có điểm'}  
                    <strong><b>Ngoại ngữ 2:</b></strong> ${student.NgoaiNgu2 || 'Chưa có điểm'}
                </p>
            `;
        }).join("");

        resultDiv.innerHTML = studentDetails;
    } else {
        resultDiv.innerHTML = '<div class="error">Không tìm thấy thí sinh với số báo danh này!</div>';
    }
}
