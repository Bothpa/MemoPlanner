const mysql = require('mysql2');

// MySQL 연결 정보
const connection = mysql.createConnection({
    host: '172.17.0.2',    // MySQL 서버 호스트
    user: 'root',    // MySQL 사용자 이름
    password: '441517',  // MySQL 사용자 비밀번호
    database: 'memoplanner' //작업 서버 db
  });

// 연결 시도
connection.connect((err) => {
    if (err) {
    console.error('MySQL 연결 실패: ' + err.stack);
    return;
    }
    console.log('MySQL 연결 성공');
});

// 노드 서버가 종료될 때 MySQL 연결 종료
process.on('exit', () => {
    connection.end((err) => {
        if (err) {
            console.error('MySQL 연결 종료 실패: ' + err.stack);
            return;
        }
        console.log('MySQL 연결이 종료되었습니다.');
    });
});
// Ctrl-C 시그널에 반응하여 MySQL 연결 종료
process.on('SIGINT', () => {
    connection.end((err) => {
        if (err) {
            console.error('MySQL 연결 종료 실패: ' + err.stack);
            return;
        }
        console.log('MySQL 연결이 종료되었습니다.');
        process.exit(0); // 노드 서버 종료
    });
});
//----------------------------------------------------------------------커넥션 설정 끝
//----------------------------------------------------------------------CURD

// executeQuery
function executeQuery(query, values, callback) {
    connection.query(query, values, callback);
}


//스캐줄 가져오기
async function GetSchedule(year, month, userid, callback) {
    const selectQuery = 'SELECT * FROM schedule WHERE year=? AND month=? AND userid=?  ORDER BY day ASC;';
    const values = [year, month, userid];

    executeQuery(selectQuery, values, (error, values) => {
        if (error) {
            console.error('쿼리 실행 오류: ' + error);
            callback(false); // 실패 시 콜백으로 false 전달
            return;
        }
        if (values.length === 0) {
            console.error('검색 결과가 없습니다.');
            callback(true); // 검색 결과가 없을 때도 실패로 간주하여 콜백으로 false 전달
            return;
        }

        // console.table(values);
        callback(true,values); // 성공 시 콜백으로 true 전달
        return;
    })
}

async function InsertSchedule(year, month, day, color, usertext, userid, callback) {
    const insertQuery = 'INSERT INTO schedule (year, month, day, color, usertext, userid) VALUE (?,?,?,?,?,?) ;';
    const values = [year, month, day, color, usertext, userid];

    executeQuery(insertQuery, values, (error, values) => {
        if (error) {
            console.error('쿼리 실행 오류: ' + error);
            callback(false); // 실패 시 콜백으로 false 전달
            return;
        }
        if (values.length === 0) {
            console.error('검색 결과가 없습니다.');
            callback(true); // 검색 결과가 없을 때도 실패로 간주하여 콜백으로 false 전달
            return;
        }

        // console.table(values);
        callback(true); // 성공 시 콜백으로 true 전달
        return;
    })
}

async function UpdateSchedule(year, month, day, color, usertext, userid, id, callback) {
    const updateQuery = 'UPDATE schedule SET year = ?, month = ?, day = ?, color = ?, usertext = ? WHERE id = ? AND userid = ?;';
    const values = [year, month, day, color, usertext, id, userid];

    executeQuery(updateQuery, values, (error, values) => {
        if (error) {
            console.error('쿼리 실행 오류: ' + error);
            callback(false); // 실패 시 콜백으로 false 전달
            return;
        }
        if (values.length === 0) {
            console.error('검색 결과가 없습니다.');
            callback(true); // 검색 결과가 없을 때도 실패로 간주하여 콜백으로 false 전달
            return;
        }

        // console.table(values);
        callback(true); // 성공 시 콜백으로 true 전달
        return;
    })
}
    
async function DeleteSchedule(userid, id, callback) {
    const deleteQuery = 'DELETE FROM schedule WHERE id = ? AND userid = ?;';
    const values = [id, userid];

    executeQuery(deleteQuery, values, (error, values) => {
        if (error) {
            console.error('쿼리 실행 오류: ' + error);
            callback(false); // 실패 시 콜백으로 false 전달
            return;
        }
        if (values.length === 0) {
            console.error('검색 결과가 없습니다.');
            callback(true); // 검색 결과가 없을 때도 실패로 간주하여 콜백으로 false 전달
            return;
        }

        // console.table(values);
        callback(true); // 성공 시 콜백으로 true 전달
        return;
    })
}

  module.exports = {
    GetSchedule,
    InsertSchedule,
    UpdateSchedule,
    DeleteSchedule,
  };
