CREATE TABLE [dbo].[tbl_product_categories] (
    [id_product_category] INT           IDENTITY (1, 1) NOT NULL,
    [description]         VARCHAR (100) NULL,
    [last_update]         DATETIME      CONSTRAINT [DF_tbl_product_categories_last_update] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_tbl_product_categories] PRIMARY KEY CLUSTERED ([id_product_category] ASC)
);

