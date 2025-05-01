package main

import (
	"fmt"
	"leaveit/internal/config"
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	err := config.Load()
	if err != nil {
		fmt.Println("Error loading config:", err)
		return
	}

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "hello there")
	})

	e.Logger.Fatal(e.Start(":" + config.Get("PORT")))
}
