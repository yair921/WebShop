CREATE TABLE [dbo].[tbl_products] (
    [id_product]  INT             IDENTITY (1, 1) NOT NULL,
    [number]      VARCHAR (20)    NULL,
    [title]       VARCHAR (100)   NULL,
    [price]       DECIMAL (18, 4) NULL,
    [last_update] DATETIME        CONSTRAINT [DF_tbl_products_last_update] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_tbl_products] PRIMARY KEY CLUSTERED ([id_product] ASC)
);

