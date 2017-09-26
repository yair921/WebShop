CREATE TABLE [dbo].[tbl_relationship_op] (
    [id]         INT IDENTITY (1, 1) NOT NULL,
    [id_order]   INT NULL,
    [id_product] INT NULL,
    [enabled]    BIT NULL,
    CONSTRAINT [PK_tbl_relationship_op] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_tbl_relationship_op_tbl_orders] FOREIGN KEY ([id_order]) REFERENCES [dbo].[tbl_orders] ([id_order]),
    CONSTRAINT [FK_tbl_relationship_op_tbl_products] FOREIGN KEY ([id_product]) REFERENCES [dbo].[tbl_products] ([id_product])
);

