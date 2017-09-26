CREATE TABLE [dbo].[tbl_relationship_pc] (
    [id]                  INT      IDENTITY (1, 1) NOT NULL,
    [id_product]          INT      NULL,
    [id_product_category] INT      NULL,
    [enabled]             BIT      NULL,
    [last_update]         DATETIME CONSTRAINT [DF_tbl_relationship_pc_last_update] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_tbl_relationship_pc] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_tbl_relationship_pc_tbl_product_categories] FOREIGN KEY ([id_product_category]) REFERENCES [dbo].[tbl_product_categories] ([id_product_category]),
    CONSTRAINT [FK_tbl_relationship_pc_tbl_products] FOREIGN KEY ([id_product]) REFERENCES [dbo].[tbl_products] ([id_product])
);

