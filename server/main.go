package main

import (
	"fmt"
	"leaveit/internal/config"
	"leaveit/internal/dbconn"
	"net/http"

	"github.com/labstack/echo/v4"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	e := echo.New()

	err := config.Load()
	if err != nil {
		fmt.Println("Error loading config:", err)
		return
	}

	err = dbconn.Init()
	if err != nil {
		fmt.Println("Error init db:", err)
		return
	}

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "hello there")
	})

	e.Logger.Fatal(e.Start(":" + config.Get("PORT")))
}
