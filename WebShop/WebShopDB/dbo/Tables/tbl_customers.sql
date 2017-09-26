CREATE TABLE [dbo].[tbl_customers] (
    [id_customer]  INT           IDENTITY (1, 1) NOT NULL,
    [name]         VARCHAR (100) NULL,
    [last_updated] DATETIME      CONSTRAINT [DF_tbl_customers_last_updated] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_tbl_customers] PRIMARY KEY CLUSTERED ([id_customer] ASC)
);

