package dbconn

import (
	"database/sql"
	"leaveit/internal/config"
	"path/filepath"
)

var db *sql.DB

func Init() error {
	sqldb, err := sql.Open("sqlite3", getDBPath())
	if err != nil {
		return err
	}
	err = sqldb.Ping()
	if err != nil {
		return err
	}
	db = sqldb
	return nil
}

func GetConn() *sql.DB {
	return db
}

func getDBPath() string {
	dbPath := config.Get("DB_PATH")
	resolvedPath, err := filepath.Abs(dbPath)
	if err != nil {
		return dbPath
	}
	return resolvedPath
}
